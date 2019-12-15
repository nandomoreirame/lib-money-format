/* eslint comma-dangle: 0 */
/* globals test describe beforeEach */
import { expect } from 'chai';
import Money from '.';

let money;

describe('Money class', () => {
  describe('new Money("123") instance', () => {
    beforeEach(() => {
      money = new Money(123);
    });

    describe('money.amount', () => {
      test('money.amount should be a number', () => {
        expect(money.amount).to.be.a('number');
      });

      test('money.amount should be equal 123', () => {
        expect(money.amount).to.equal(123);
      });
    });

    describe('money.format()', () => {
      test('Money.format should be a function', () => {
        expect(money.format).to.be.a('function');
      });

      test('Money.format() should return a string', () => {
        expect(money.format()).to.be.a('string');
      });

      test('Money.format() should be equal "US$ 123.00"', () => {
        expect(money.format()).to.equal('US$ 123.00');
      });

      test('Money.format({ prefix: "R$" }) should be equal "R$ 123.00"', () => {
        expect(money.format({ prefix: 'R$' })).to.equal('R$ 123.00');
      });

      test('Money.format({ prefix: "", suffix: "€" }) should be equal "123.00 €"', () => {
        expect(money.format({ prefix: '', suffix: '€' })).to.equal('123.00 €');
      });
    });
  });

  describe('new Money(1) instance', () => {
    beforeEach(() => {
      money = new Money(1);
    });

    describe('money.amount', () => {
      test('money.amount should be equal 1.00', () => {
        expect(money.amount).to.equal(1);
      });
    });

    describe('money.format()', () => {
      test('Money.format() should return a string', () => {
        expect(money.format()).to.be.a('string');
      });

      test('Money.format() should be equal "US$ 1.00"', () => {
        expect(money.format()).to.equal('US$ 1.00');
      });

      test('Money.format({ prefix: "R$" }) should be equal "R$ 1.00"', () => {
        expect(money.format({ prefix: 'R$' })).to.equal('R$ 1.00');
      });

      test('Money.format({ prefix: "", suffix: "€" }) should be equal "1.00 €"', () => {
        expect(money.format({ prefix: '', suffix: '€' })).to.equal('1.00 €');
      });
    });
  });

  describe('new Money(12.75) instance', () => {
    beforeEach(() => {
      money = new Money(12.75);
    });

    describe('money.amount', () => {
      test('money.amount should be equal 12.75', () => {
        expect(money.amount).to.equal(12.75);
      });
    });

    describe('money.format()', () => {
      test('Money.format() should return a string', () => {
        expect(money.format()).to.be.a('string');
      });

      test('Money.format({ prefix: "R$" }) should be equal "R$ 10.000,25"', () => {
        money.amount = 10000.25;
        expect(
          money.format({
            prefix: 'R$',
            separators: { decimal: ',', thousands: '.' },
          })
        ).to.equal('R$ 10.000,25');
      });

      test('Money.format({ prefix: "", suffix: "€" }) should be equal "100.00 €"', () => {
        money.amount = 100;
        expect(money.format({ prefix: '', suffix: '€' })).to.equal('100.00 €');
      });

      test('Money.format() should be equal "12,00 BRL"', () => {
        money.amount = 12;

        expect(
          money.format({
            prefix: '',
            suffix: 'BRL',
            separators: { decimal: ',', thousands: '.' },
          })
        ).to.equal('12,00 BRL');
      });

      test('Money.format() should be equal "$ 10.75"', () => {
        money.amount = 10.75;
        money.prefix = '$';
        money.suffix = '';

        expect(money.format()).to.equal('$ 10.75');
      });
    });
  });

  describe('new Money(10000.3) instance', () => {
    beforeEach(() => {
      money = new Money(10000.3);
    });

    describe('money.format()', () => {
      test('Money.format() should be equal "US$ 10,000.300"', () => {
        expect(money.format({ decimalCount: 3 })).to.equal('US$ 10,000.300');
      });

      test('Money.format() should be equal "US$ 10,000.3000"', () => {
        money.decimalCount = 4;
        expect(money.format()).to.equal('US$ 10,000.3000');
      });
    });
  });

  describe('new Money(15) instance', () => {
    beforeEach(() => {
      money = new Money(15000);
    });

    describe('money.format()', () => {
      test('Money.format() should be equal "US$ 15...000-00"', () => {
        expect(
          money.format({
            separators: {
              decimal: '-',
              thousands: '...',
            },
          })
        ).to.equal('US$ 15...000-00');
      });

      test('Money.format() should be equal "R$ 90.390.298.371,750"', () => {
        money.amount = 90390298371.75;
        expect(
          money.format({
            prefix: 'R$',
            decimalCount: 3,
            separators: {
              decimal: ',',
              thousands: '.',
            },
          })
        ).to.equal('R$ 90.390.298.371,750');
      });
    });
  });

  describe('new Money(0) instance', () => {
    beforeEach(() => {
      money = new Money(0);
    });

    describe('money.format()', () => {
      test('new Money(0).format() should be equal "US$ 0.00"', () => {
        expect(money.format()).to.equal('US$ 0.00');
      });
    });

    describe('money.format()', () => {
      test('money.amount = false should be equal "US$ 0.00"', () => {
        money.amount = false;
        expect(money.format()).to.equal('US$ 0.00');
      });
    });

    describe('money.format()', () => {
      test('money.amount = "Foo Bar" should be equal "US$ 0.00"', () => {
        money.amount = 'Foo Bar';
        expect(money.format()).to.equal('US$ 0.00');
      });
    });

    describe('money.format()', () => {
      test('money.amount = undefined should be equal "US$ 0.00"', () => {
        money.amount = undefined;
        expect(money.format()).to.equal('US$ 0.00');
      });
    });
  });
});
