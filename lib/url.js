(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('simple-url', [], function () {
      return (root.returnExportsGlobal = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root.simple = root.simple || {};
    root.simple['url'] = factory();
  }
}(this, function () {

var Url, url;

Url = (function() {
  function Url(_url) {
    var href, link;
    this._url = _url != null ? _url : document.location.href;
    if (this._url.constructor === Url) {
      return this._url;
    }
    link = document.createElement('a');
    link.href = this._url;
    href = link.href, this.protocol = link.protocol, this.host = link.host, this.hostname = link.hostname, this.port = link.port, this.pathname = link.pathname, this.search = link.search, this.hash = link.hash;
    if (this.port === '0') {
      this.port = '';
    }
    this.search = Url.parseParams(this.search);
    this.hash = this.hash.replace(/^#/ig, '');
  }

  Url.prototype.absolute = function() {
    return "" + (this.origin()) + (this.relative());
  };

  Url.prototype.relative = function() {
    var hash;
    hash = this.hash.length > 0 ? "#" + this.hash : this.hash;
    return [this.pathname, Url.serializeParams(this.search), hash].join('');
  };

  Url.prototype.origin = function() {
    var str;
    str = [this.protocol, '//', this.hostname].join('');
    if (this.port.length > 0) {
      str += ":" + this.port;
    }
    return str;
  };

  Url.prototype.setParam = function() {
    var args, k, obj, v, _results;
    args = arguments;
    if (args.length === 1 && typeof args[0] === "object") {
      obj = args[0];
    } else if (args.length === 2) {
      obj = {};
      obj[args[0].toString()] = args[1].toString();
    } else {
      return false;
    }
    _results = [];
    for (k in obj) {
      v = obj[k];
      _results.push(this.search[k.toString()] = v.toString());
    }
    return _results;
  };

  Url.prototype.getParam = function(name) {
    return this.search[name];
  };

  Url.prototype.removeParam = function(name) {
    return delete this.search[name];
  };

  Url.parseParams = function(str) {
    var k, obj, param, v, _i, _len, _ref, _ref1;
    str = str.replace(/^\?/ig, '');
    obj = {};
    _ref = str.split('&');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      param = _ref[_i];
      _ref1 = param.split('='), k = _ref1[0], v = _ref1[1];
      if (k) {
        obj[k] = v;
      }
    }
    return obj;
  };

  Url.serializeParams = function(obj) {
    var k, str, v;
    if (!obj) {
      return "";
    }
    str = ((function() {
      var _results;
      _results = [];
      for (k in obj) {
        v = obj[k];
        _results.push([k, v].join('='));
      }
      return _results;
    })()).join('&');
    if (str.length > 0) {
      str = '?' + str;
    }
    return str;
  };

  return Url;

})();

url = function(url) {
  return new Url(url);
};


return url;


}));

