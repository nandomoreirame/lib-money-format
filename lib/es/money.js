class Money {
  constructor(
    amount = 0,
    prefix = 'US$',
    suffix = '',
    decimalCount = 2,
    separators = {
      decimal: '.',
      thousands: ',',
    }
  ) {
    this._amount = amount;
    this._params = {
      prefix,
      suffix,
      decimalCount,
      separators,
    };
  }

  get params() {
    return this._params;
  }

  get cents() {
    return this._cents;
  }

  get thousands() {
    return this._thousands;
  }

  set decimalCount(count) {
    this.params.decimalCount = count;
  }

  set prefix(prefix) {
    this.params.prefix = prefix;
  }

  get prefix() {
    return `${this.params.prefix} `;
  }

  set suffix(suffix) {
    this.params.suffix = suffix;
  }

  get suffix() {
    return ` ${this.params.suffix}`;
  }

  get amount() {
    return !(isNaN(this._amount) && typeof this._amount !== 'number')
      ? this._amount
      : 0;
  }

  set amount(amount) {
    this._amount = Number(amount);
  }

  toSeparate() {
    const { separators, decimalCount } = this.params;

    const i = parseInt( (this.amount = Math.abs(this.amount || 0).toFixed(decimalCount)) ).toString(); // eslint-disable-line
    const j = i.length > 3 ? i.length % 3 : 0;

    this._cents = decimalCount
      ? separators.decimal +
        Math.abs(this.amount - i)
          .toFixed(decimalCount)
          .slice(2)
      : '';

    this._thousands =
      (j ? i.substr(0, j) + separators.thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${separators.thousands}`);
  }

  get formatted() {
    this.toSeparate();
    return `${this.prefix}${this.thousands}${this.cents}${this.suffix}`.trim();
  }

  format(params = {}) {
    this._params = {
      ...this._params,
      ...params,
    };
    return this.formatted;
  }
}

module.exports = Money;
