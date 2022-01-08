const { WebClient } = require('@slack/web-api'),
  TOKEN = process.env.SLACK_TOKEN,
  web = new WebClient(TOKEN)

addEventListener('fetch', (event) => {
  try {
    event.respondWith(handleEvent(event))
  } catch (error) {
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

async function handleEvent(event) {
  console.log('success')
}