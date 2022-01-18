import { SLACK_WEBHOOK_URL } from "../config"
import { constructGhIssueSlackMessage } from "../utils/slack"

export default async (request) => {
  try {
    const body = await request.text(),
      {action, issue, repository} = JSON.parse(body),
      prefix_text = `An issue was ${action}:`,
      issue_string = `${repository.owner.login}/${repository.name}#${issue.number}`

    const blocks = constructGhIssueSlackMessage(issue, issue_string, prefix_text)

    const postToSlack = await fetch(SLACK_WEBHOOK_URL, {
      body: JSON.stringify({blocks}),
      method: "POST",
      headers: {"Content-type": "application/json"}
    })

    return new Response("WORKED")
  } catch(err) {
    return new Response('Unable to handle webhook', { status: 500 })
  }
}