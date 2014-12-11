class Url
  constructor: (@_url = document.location.href) ->
    return @_url if @_url.constructor is Url
    @link ?= document.createElement 'a'
    @link.href = @_url
    @_parse()

  _parse: ->
    {
      @href,
      @protocol,
      @host,
      @hostname,
      @port,
      @pathname,
      @search,
      @hash
    } = @link

    @origin = [@protocol, '//', @hostname].join ''
    @origin += ":#{ @port }" if @port.length > 0

    @relative = [@pathname, @search, @hash].join ''
    @absolute = @href

  setParam: () ->
    args = arguments

    if args.length is 1 and typeof args[0] is "object"
      obj = args[0]
    else if args.length is 2
      obj = {}
      obj[args[0].toString()] = args[1].toString()
    else
      return false

    params = Url.parseParams @search

    for k, v of obj
      params[k.toString()] = v.toString()

    @link.search = Url.serializeParams params
    @_parse()

  getParam: (name) ->
    Url.parseParams(@search)[name]

  removeParam: (name) ->
    params = Url.parseParams @search
    delete params[name]
    @link.search = Url.serializeParams params
    @_parse()

  @parseParams: (str) ->
    str = str.replace(/^\?/ig, '')
    obj = {}

    for param in str.split('&')
      [k, v] = param.split('=')
      obj[k] = v if k

    obj

  @serializeParams: (obj) ->
    return "" unless obj
    ([k, v].join('=') for k, v of obj).join('&')

url = (url) ->
  new Url(url)
