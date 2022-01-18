const Method = method => req => req.method.toLowerCase() === method.toLowerCase()

const Post = Method('post')

const Header = (header, val) => req => req.headers.get(header) === val,
  Host = host => Header('host', host.toLowerCase()),
  Referrer = host => Header('referrer', host.toLowerCase())

const Path = (regExp) => {
  return (request) => {
    const url = new URL(request.url),
      path = url.pathname

    return path.match(regExp) && path.match(regExp)[0] === path
  }
}

class Router {
  constructor() {
    this.routes = []
  }

  handle(conditions, handler) {
    this.routes.push({
      conditions,
      handler
    })

    return this
  }

  post(url, handler) {
    return this.handle([Post, Path(url)], handler)
  }
}

export default Router