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
    this._url = _url != null ? _url : document.location.href;
    if (this._url.constructor === Url) {
      return this._url;
    }
    if (this.link == null) {
      this.link = document.createElement('a');
    }
    this.link.href = this._url;
    this._parse();
  }

  Url.prototype._parse = function() {
    var _ref;
    _ref = this.link, this.href = _ref.href, this.protocol = _ref.protocol, this.host = _ref.host, this.hostname = _ref.hostname, this.port = _ref.port, this.pathname = _ref.pathname, this.search = _ref.search, this.hash = _ref.hash;
    this.origin = [this.protocol, '//', this.hostname].join('');
    if (this.port.length > 0) {
      this.origin += ":" + this.port;
    }
    this.relative = [this.pathname, this.search, this.hash].join('');
    return this.absolute = this.href;
  };

  Url.prototype.setParam = function() {
    var args, k, obj, params, v;
    args = arguments;
    if (args.length === 1 && typeof args[0] === "object") {
      obj = args[0];
    } else if (args.length === 2) {
      obj = {};
      obj[args[0].toString()] = args[1].toString();
    } else {
      return false;
    }
    params = Url.parseParams(this.search);
    for (k in obj) {
      v = obj[k];
      params[k.toString()] = v.toString();
    }
    this.link.search = Url.serializeParams(params);
    return this._parse();
  };

  Url.prototype.getParam = function(name) {
    return Url.parseParams(this.search)[name];
  };

  Url.prototype.removeParam = function(name) {
    var params;
    params = Url.parseParams(this.search);
    delete params[name];
    this.link.search = Url.serializeParams(params);
    return this._parse();
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
    var k, v;
    if (!obj) {
      return "";
    }
    return ((function() {
      var _results;
      _results = [];
      for (k in obj) {
        v = obj[k];
        _results.push([k, v].join('='));
      }
      return _results;
    })()).join('&');
  };

  return Url;

})();

url = function(url) {
  return new Url(url);
};


return url;


}));

