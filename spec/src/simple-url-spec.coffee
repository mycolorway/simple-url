describe "common", ->
  it "should get location.href when without param", ->
    url = simple.url()
    expect(url.url).toEqual(location.href)


  it "? is alias of search, # is alias of hash", ->
    url = simple.url("http://tower.im/?hello=1#world=2")
    expect(url.get("?")).toEqual(url.get("search"))
    expect(url.get("#")).toEqual(url.get("hash"))


  it "should get empty string when no search and hash", ->
    url = simple.url("http://tower.im/")
    expect(url.get("?")).toEqual("")
    expect(url.get("#")).toEqual("")



describe "absolute url", ->
  it "path should be root when just slash at end", ->
    url = simple.url("http://tower.im/")
    expect(url.get("path")).toEqual("/")


  it "path should be root when no slash at end", ->
    url = simple.url("http://tower.im")
    expect(url.get("path")).toEqual("/")



describe "relative url", ->
  it "path should be root when just slash at end", ->
    url = simple.url("baidu.com/")
    expect(url.get("path")).toEqual("/")


  it "path should be root when no slash at end", ->
    url = simple.url("baidu.com")
    expect(url.get("path")).toEqual("/")
