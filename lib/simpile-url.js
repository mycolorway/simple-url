(function() {
  var Url;

  Url = (function() {
    function Url(url) {
      var defaultProtocol;
      url || (url = location.toString());
      if (!url) {
        return null;
      }
      this._url = url;
      this.url = url;
      defaultProtocol = (typeof location !== "undefined" && location !== null ? location.protocol : void 0) || 'http:';
      if (this.url.substring(0, 2) === "//") {
        this.url = "" + defaultProtocol + this.url;
      } else if (this.url.split('://').length === 1) {
        this.url = "" + defaultProtocol + "//" + this.url;
      }
    }

    Url.prototype.get = function(name) {
      switch (name) {
        case "path":
          return this._getPath();
        case "search":
        case "?":
          return this._getSearch();
        case "hash":
        case "#":
          return this._getHash();
        default:
          return void 0;
      }
    };

    Url.prototype._getPath = function() {
      var arrUrl;
      arrUrl = this.url.split('/');
      return "/" + (arrUrl.slice(3, arrUrl.length).join('/').split('?')[0].split('#')[0]);
    };

    Url.prototype._getSearch = function() {
      return (this.url.split('?')[1] || '').split('#')[0];
    };

    Url.prototype._getHash = function() {
      return this.url.split('#')[1] || '';
    };

    return Url;

  })();

  this.simple = {};

  this.simple.url = function(url) {
    return new Url(url);
  };

}).call(this);
