// Buttons in GitHub's and CurseForge's own look, with their logos. Used for every
// link to a repository on GitHub and every download on CurseForge.

// GitHub's mark (the octocat), from GitHub's logo page
const gitHubMark =
  'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'

// CurseForge's anvil, from the logo on curseforge.com
const curseForgeAnvil =
  'M23.9074 12.0181C23.9074 12.0181 30.0327 11.0522 31 8.23523H21.6168V6H1L3.53975 8.94699V11.9664C3.53975 11.9664 9.94812 11.6332 12.427 13.5129C15.8202 16.6579 8.61065 20.9092 8.61065 20.9092L7.37439 25C9.30758 23.1593 12.9921 20.7781 19.7474 20.8929C17.1767 21.7053 14.5917 22.9743 12.5794 25H26.2354L24.9494 20.9092C24.9494 20.9092 15.0519 15.0732 23.9074 12.0184V12.0181Z'

export function GitHubButton({ href, children = 'View on GitHub' }) {
  return (
    <a className="brand-button brand-github" href={href}>
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d={gitHubMark} fill="currentColor" />
      </svg>
      {children}
    </a>
  )
}

export function CurseForgeButton({ href, children = 'Download on CurseForge' }) {
  return (
    <a className="brand-button brand-curseforge" href={href}>
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d={curseForgeAnvil} fill="currentColor" />
      </svg>
      {children}
    </a>
  )
}
