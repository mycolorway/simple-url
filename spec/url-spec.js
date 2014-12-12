describe("initialize", function() {
  return it("should get location.href when without param", function() {
    var local, url;
    url = simple.url();
    local = location.href;
    return expect(url.absolute()).toEqual(local);
  });
});

describe("protocol", function() {
  it("should be same as location when no protocol and double slash", function() {
    var url;
    url = simple.url("tower.im");
    return expect(url.protocol).toEqual(location.protocol);
  });
  return it("should get right protocol when protocol appare", function() {
    var url;
    url = simple.url("ftp://tower.im");
    return expect(url.protocol).toEqual("ftp:");
  });
});

describe("host", function() {
  it("should get empty string when only path", function() {
    var url;
    url = simple.url("/project/123");
    return expect(url.host).toEqual(location.host);
  });
  it("should get right host when it is a root url", function() {
    var url;
    url = simple.url("http://tower.im/");
    return expect(url.host).toEqual("tower.im");
  });
  it("should get current location host when it is a bare host", function() {
    var url;
    url = simple.url("tower.im");
    return expect(url.host).toEqual(location.host);
  });
  return it("should get right host when it is just ip address", function() {
    var url;
    url = simple.url("http://192.168.0.1");
    return expect(url.host).toEqual("192.168.0.1");
  });
});

describe("port", function() {
  it("should get empty string when port is default", function() {
    var url;
    url = simple.url("http://tower.im/project/123");
    expect(url.port).toEqual("");
    url = simple.url("http://tower.im:80/project/123");
    return expect(url.port).toEqual("");
  });
  return it("should get right string when port appare", function() {
    var url;
    url = simple.url("http://tower.im:8080/project/123");
    return expect(url.port).toEqual("8080");
  });
});

describe("pathname", function() {
  it("should get current location pathname when only search", function() {
    var url;
    url = simple.url("?a=1");
    return expect(url.pathname).toEqual(location.pathname);
  });
  it("should get right string when just a path", function() {
    var url;
    url = simple.url("/project/123?a=1");
    return expect(url.pathname).toEqual("/project/123");
  });
  it("should get current location pathname when it is relative path", function() {
    var paths, url;
    url = simple.url("project/123");
    paths = location.pathname.split('/');
    paths[paths.length - 1] = 'project/123';
    return expect(url.pathname).toEqual(paths.join('/'));
  });
  return it("should get right string when it is a root path with slash", function() {
    var url;
    url = simple.url("http://tower.im/");
    return expect(url.pathname).toEqual("/");
  });
});

describe("search and hash", function() {
  it("should get empty string when no search and hash", function() {
    var url;
    url = simple.url("http://tower.im/");
    expect(url.search).toEqual({});
    return expect(url.hash).toEqual("");
  });
  it("should get right search and hash when it has", function() {
    var url;
    url = simple.url("http://tower.im/?a=1&b=2#20130303");
    expect(url.search).toEqual({
      a: '1',
      b: '2'
    });
    return expect(url.hash).toEqual("20130303");
  });
  it("should get empty string when search value is nothing", function() {
    var url;
    url = simple.url("http://tower.im/?a=");
    return expect(url.search).toEqual({
      a: ''
    });
  });
  it("should get right string when use getParam", function() {
    var url;
    url = simple.url("http://tower.im/?a=1&b=2");
    expect(url.getParam('b')).toEqual("2");
    return expect(url.getParam('c')).toBeUndefined();
  });
  it("should set right search when search is empty string", function() {
    var url;
    url = simple.url("http://tower.im/");
    url.setParam('a', '1');
    url.setParam({
      b: '2',
      c: '3'
    });
    expect(url.search).toEqual({
      a: '1',
      b: '2',
      c: '3'
    });
    return expect(url.absolute()).toEqual("http://tower.im/?a=1&b=2&c=3");
  });
  return it("should get undefined after removeParam", function() {
    var url;
    url = simple.url("http://tower.im/?a=1&b=2");
    url.removeParam('a');
    expect(url.search).toEqual({
      b: '2'
    });
    url.removeParam('b');
    return expect(url.search).toEqual({});
  });
});

describe("toString", function() {
  it("should get right string", function() {
    var str, url;
    str = "http://tower.im:8080/project/123?a=1&b=2#20120101";
    url = simple.url(str);
    expect(url.absolute()).toEqual("http://tower.im:8080/project/123?a=1&b=2#20120101");
    str = "/project/123?a=1&b=2#20120101";
    url = simple.url(str);
    expect(url.absolute()).toEqual("" + (url.origin()) + "/project/123?a=1&b=2#20120101");
    str = "/project/123#20120101";
    url = simple.url(str);
    return expect(url.absolute()).toEqual("" + (url.origin()) + "/project/123#20120101");
  });
  return it("should get right string when request relative", function() {
    var str, url;
    str = "http://tower.im:8080/project/123?a=1&b=2#20120101";
    url = simple.url(str);
    expect(url.relative()).toEqual("/project/123?a=1&b=2#20120101");
    str = "/project/123?a=1&b=2#20120101";
    url = simple.url(str);
    expect(url.relative()).toEqual("/project/123?a=1&b=2#20120101");
    str = "/project";
    url = simple.url(str);
    return expect(url.relative()).toEqual("/project");
  });
});
