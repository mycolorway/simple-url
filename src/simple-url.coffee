class Url
  constructor: (url) ->
    url ||= location.toString()
    return null unless url

    @_url = url
    @url = url

    defaultProtocol = location?.protocol || 'http:'

    if @url.substring(0, 2) is "//"
      @url = "#{ defaultProtocol }#{ @url }"
    else if @url.split('://').length is 1
      @url = "#{ defaultProtocol }//#{ @url }"


  get: (name) ->
    switch name
      when "path"
        @_getPath()
      when "search", "?"
        @_getSearch()
      when "hash", "#"
        @_getHash()
      else
        return undefined


  _getPath: ->
    arrUrl = @url.split('/')
    "/#{ arrUrl.slice(3, arrUrl.length).join('/').split('?')[0].split('#')[0] }"


  _getSearch: ->
    (@url.split('?')[1] || '').split('#')[0]


  _getHash: ->
    (@url.split('#')[1] || '')



@simple = {}

@simple.url = (url) ->
  new Url(url)
