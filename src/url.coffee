class Url
  constructor: (@_url = document.location.href) ->
    return @_url if @_url.constructor is Url

    link = document.createElement 'a'
    link.href = @_url
    {href, @protocol, @host, @hostname, @port, @pathname, @search, @hash} = link

    # fix grunt test
    @port = '' if @port is '0'

    @search = Url.parseParams @search
    @hash = @hash.replace(/^#/ig, '')

  toString: (type = 'absolute') ->
    switch type
      when 'origin'
        str = [@protocol, '//', @hostname].join ''
        str += ":#{ @port }" if @port.length > 0
      when 'relative'
        hash = if @hash.length > 0 then "##{ @hash }" else @hash
        str = [@pathname, Url.serializeParams(@search), hash].join ''
      when 'absolute'
        str = "#{ @toString('origin') }#{ @toString('relative') }"
      else
        str = ''

    str

  setParam: () ->
    args = arguments

    if args.length is 1 and typeof args[0] is "object"
      obj = args[0]
    else if args.length is 2
      obj = {}
      obj[args[0].toString()] = args[1].toString()
    else
      return false

    for k, v of obj
      @search[k.toString()] = v.toString()

  getParam: (name) ->
    @search[name]

  removeParam: (name) ->
    delete @search[name]

  @parseParams: (str) ->
    str = str.replace(/^\?/ig, '')
    obj = {}

    for param in str.split('&')
      [k, v] = param.split('=')
      obj[k] = v if k

    obj

  @serializeParams: (obj) ->
    return "" unless obj
    str = ([k, v].join('=') for k, v of obj).join('&')
    str = '?' + str if str.length > 0
    str

url = (url) ->
  new Url(url)
