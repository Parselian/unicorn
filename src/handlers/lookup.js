import qs from 'qs'
import {fetchGitHubIssue, parseGhIssueString} from "../utils/github"
import { constructGhIssueSlackMessage } from "../utils/slack"

export default async (request) => {
  try {
    const body = await request.text(),
    params = qs.parse(body),
    text = params["text"].trim(),
    { owner, repo, issue_number } = parseGhIssueString(text)

  const response = await fetchGitHubIssue(owner, repo, issue_number),
    issue = await response.json()

  const blocks = constructGhIssueSlackMessage(issue, text)

  return new Response(
    JSON.stringify({
      blocks,
      response_type: "in_channel"
    }),
    {
      headers: {"Content-type": "application/json"}
    }
  )
  } catch(err) {
    return new Response("Argh, i cannot find your issue!")
  }
}