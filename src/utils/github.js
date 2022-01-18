const ghIssueRegex = /(?<owner>\w*)\/(?<repo>\w*)\#(?<issue_number>\d*)/

export const parseGhIssueString = (text) => {
  const match = text.match(ghIssueRegex)

  return match ? match.groups : null
}

export const fetchGitHubIssue = (owner, repo, issue_number) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}`,
    headers = { "User-Agent": "unicorn" }

  return fetch(url, { headers })
}