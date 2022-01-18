import lookup from './src/handlers/lookup'
import webhook from './src/handlers/webhook'
import Router from './router'


addEventListener("fetch", (e) => {
  e.respondWith(handleRequest(e.request))
})

  console.log(12)
async function handleRequest(request) {
  const router = new Router()

  router.post("/lookup", lookup)
  router.post("/webhook", webhook)

  let response = await router.route(request)

  if (!response) {
    response = new Response("Not found", {status: 404})
  }

  return response
}

// const { WebClient, LogLevel } = require('@slack/web-api'),
//   TOKEN = process.env.SLACK_TOKEN || 'sDDE51nLNtQRRTUr7FCQ1RS6',
//   web = new WebClient(TOKEN)

/*
async function handleRequest(request) {
  if (new Date().getUTCHours() === 11 && new Date().getUTCMinutes() === 56) {
    const client = new WebClient(TOKEN, {
      logLevel: LogLevel.DEBUG,
    });

    console.log('worked');

    const result = JSON.stringify(client.chat.postMessage({
      channel: `#test-bot`,
      text: 'testestest',
    }));

    return new Response( result, { headers: { 'Content-type': 'application/json' } });
  } else {
    return new Response('you`re late')
  }
}
*/
