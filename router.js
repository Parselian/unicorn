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

  route(request) {
    console.log('test route')
    const route = this.resolve(request)

    if (route) {
      return route.handler(request)
    }

    return new Response('resource not found', {
      status: 404,
      statusText: 'not found',
      headers: {
        'content-type': 'text/plain',
      },
    })
  }

  // resolve returns the matching route, if any
  resolve(request) {
    return this.routes.find(route => {
      if (!route.conditions || (Array.isArray(route) && !route.conditions.length)) {
        return true
      }

      if (typeof route.conditions === 'function') {
        return route.conditions(request)
      }

      return route.conditions.every(condition => condition(request))
    })
  }
}

export default Router