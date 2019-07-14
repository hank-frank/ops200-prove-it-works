const express = require('express');
const expect = require('chai').expect;
const path = require('path');
const Nightmare = require('nightmare');

const app = express();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../dist')));

const url = 'http://localhost:8888';

const nightmare = new Nightmare();

describe('End to End Tests', () => {
  let httpServer = null;
  let pageObject = null;

  before((done) => {
    httpServer = app.listen(8888);
    done();
  });

  beforeEach(() => {
    pageObject = nightmare.goto(url);
  });

  after((done) => {
    httpServer.close();
    done();
  });

  // This is where your code is going to go
  it('should contain a <h1> element for the page title', () => { 
    return pageObject
      .evaluate(() => document.querySelector('h1').innerText)
      .then(headerText => {
        expect(headerText).to.not.be.null;
        expect(headerText).to.equal('Mortgage Calculator');
      });
  });

  it('should contain an <input> element with the "name" interestRate', () => { 
    return pageObject
      .evaluate(() => document.querySelector('input:nth-child(3)').name)
      .then(test => {
        expect(test).to.not.be.null;
        expect(test).to.equal('interestRate');
      });
  });

  it('should contain a <select> element with an option with the text "Monthly', () => { 
    return pageObject
      .evaluate(() => document.querySelector('option').innerText)
      .then(itsText => {
        expect(itsText).to.not.be.null;
        expect(itsText).to.equal('Monthly');
      });
  });

  it('should contain a <select> element with an option with the text "Quarterly', () => { 
    return pageObject
      .evaluate(() => document.querySelector('option:last-of-type').innerText)
      .then(test => {
        expect(test).to.not.be.null;
        expect(test).to.equal('Quarterly');
      });
  });

  it('should contain a <button> element with the id "calcualte"', () => { 
    return pageObject
      .evaluate(() => document.querySelector('button').id)
      .then(buttonsId => {
        expect(buttonsId).to.not.be.null;
        expect(buttonsId).to.equal('calculate');
      });
  });

  it('should contain a <p> element with the id "output"', () => { 
    return pageObject
      .evaluate(() => document.querySelector('p').id)
      .then(psId => {
        expect(psId).to.not.be.null;
        expect(psId).to.equal('output');
      });
  });

  it('should contain a <div> element with the id "container"', () => { 
    return pageObject
      .evaluate(() => document.querySelector('div:last-child').id)
      .then(psId => {
        expect(psId).to.not.be.null;
        expect(psId).to.equal('container');
      });
  });

  it('should contain an <input> element with the name "loanTerm"', () => { 
    return pageObject
      .evaluate(() => document.querySelector('input:nth-child(4)').name)
      .then(psId => {
        expect(psId).to.not.be.null;
        expect(psId).to.equal('loanTerm');
      });
  });

  it('should correctly calculate mortgage', () =>
  pageObject
  .wait()
  .type('input[name=principal]', 300000)
  .type('input[name=interestRate]', 3.75)
  .type('input[name=loanTerm]', 30)
  .select('select[name=period]', 12)
  .click('button#calculate')
  .wait('#output')
  .evaluate(() => document.querySelector('#output').innerText)
  .then((outputText) => {
    expect(outputText).to.equal('$1389.35');
  })
).timeout(6500);
})