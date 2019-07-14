const expect = require('chai').expect;
const Mortgage = require('../../src/js/lib/Mortgage');

describe('Mortgage Calculator', () => {
    let mortgage = null;

  beforeEach(() => {
    mortgage = new Mortgage();
  });

    it('should have a monthlyPayment function', () => {
        expect(mortgage.monthlyPayment).to.exist;
    });

    it('should have function monthlyPayment return a number', () => {
        expect(mortgage.monthlyPayment()).to.be.a('number');
      });

    it('should cnot be coercable into false', () => {
        expect(mortgage.monthlyPayment()).to.not.equal('false');
    });

    it('should not be undefined', () => {
        expect(mortgage.monthlyPayment()).to.not.be.undefined;
    })
});