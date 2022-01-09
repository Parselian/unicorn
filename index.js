const { WebClient } = require('@slack/web-api'),
  TOKEN = process.env.SLACK_TOKEN,
  web = new WebClient(TOKEN)

addEventListener('fetch', (event) => {
  try {
    event.respondWith(sendMessage(event))
  } catch (error) {
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

async function sendMessage(channel, message) {
  console.log('called');

  if (new Date().getUTCHours() === 7 && new Date().getUTCMinutes() === 0) {
    const client = new WebClient(TOKEN, {
      logLevel: LogLevel.DEBUG,
    });

    console.log('worked');

    client.chat.postMessage({
      token: AUTH_TOKEN,
      channel: `#${channel}`,
      text: message,
    });
  }
}