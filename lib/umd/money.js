(function (factory) {
typeof define === 'function' && define.amd ? define(factory) :
factory();
}((function () { 'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var Money =
/*#__PURE__*/
function () {
  function Money() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'US$';
    var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var decimalCount = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
    var separators = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
      decimal: '.',
      thousands: ','
    };

    _classCallCheck(this, Money);

    this._amount = amount;
    this._params = {
      prefix: prefix,
      suffix: suffix,
      decimalCount: decimalCount,
      separators: separators
    };
  }

  _createClass(Money, [{
    key: "toSeparate",
    value: function toSeparate() {
      var _this$params = this.params,
          separators = _this$params.separators,
          decimalCount = _this$params.decimalCount;
      var i = parseInt(this.amount = Math.abs(this.amount || 0).toFixed(decimalCount)).toString(); // eslint-disable-line

      var j = i.length > 3 ? i.length % 3 : 0;
      this._cents = decimalCount ? separators.decimal + Math.abs(this.amount - i).toFixed(decimalCount).slice(2) : '';
      this._thousands = (j ? i.substr(0, j) + separators.thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1".concat(separators.thousands));
    }
  }, {
    key: "format",
    value: function format() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this._params = _objectSpread2({}, this._params, {}, params);
      return this.formatted;
    }
  }, {
    key: "params",
    get: function get() {
      return this._params;
    }
  }, {
    key: "cents",
    get: function get() {
      return this._cents;
    }
  }, {
    key: "thousands",
    get: function get() {
      return this._thousands;
    }
  }, {
    key: "decimalCount",
    set: function set(count) {
      this.params.decimalCount = count;
    }
  }, {
    key: "prefix",
    set: function set(prefix) {
      this.params.prefix = prefix;
    },
    get: function get() {
      return "".concat(this.params.prefix, " ");
    }
  }, {
    key: "suffix",
    set: function set(suffix) {
      this.params.suffix = suffix;
    },
    get: function get() {
      return " ".concat(this.params.suffix);
    }
  }, {
    key: "amount",
    get: function get() {
      return !(isNaN(this._amount) && typeof this._amount !== 'number') ? this._amount : 0;
    },
    set: function set(amount) {
      this._amount = Number(amount);
    }
  }, {
    key: "formatted",
    get: function get() {
      this.toSeparate();
      return "".concat(this.prefix).concat(this.thousands).concat(this.cents).concat(this.suffix).trim();
    }
  }]);

  return Money;
}();

module.exports = Money;

})));
