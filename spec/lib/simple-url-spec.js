(function() {
  describe("common", function() {
    it("should get location.href when without param", function() {
      var url;
      url = simple.url();
      return expect(url.url).toEqual(location.href);
    });
    it("? is alias of search, # is alias of hash", function() {
      var url;
      url = simple.url("http://tower.im/?hello=1#world=2");
      expect(url.get("?")).toEqual(url.get("search"));
      return expect(url.get("#")).toEqual(url.get("hash"));
    });
    return it("should get empty string when no search and hash", function() {
      var url;
      url = simple.url("http://tower.im/");
      expect(url.get("?")).toEqual("");
      return expect(url.get("#")).toEqual("");
    });
  });

  describe("absolute url", function() {
    it("path should be root when just slash at end", function() {
      var url;
      url = simple.url("http://tower.im/");
      return expect(url.get("path")).toEqual("/");
    });
    return it("path should be root when no slash at end", function() {
      var url;
      url = simple.url("http://tower.im");
      return expect(url.get("path")).toEqual("/");
    });
  });

  describe("relative url", function() {
    it("path should be root when just slash at end", function() {
      var url;
      url = simple.url("baidu.com/");
      return expect(url.get("path")).toEqual("/");
    });
    return it("path should be root when no slash at end", function() {
      var url;
      url = simple.url("baidu.com");
      return expect(url.get("path")).toEqual("/");
    });
  });

}).call(this);
