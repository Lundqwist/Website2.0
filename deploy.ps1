# ════════════════════════════════════════════════════════════════════════════
# deploy.ps1 — publish both sites and copy them to the Synology NAS.
#
# Usage (in PowerShell, in the project folder):
#     .\deploy.ps1            both sites
#     .\deploy.ps1 -Only site only the new site
#     .\deploy.ps1 -Only v1   only the first version
#
# What it does:
#   1. Builds the React app (site\client) into site\wwwroot.
#   2. "dotnet publish" builds a Release version of each site into a temp folder.
#   3. Copies them to \\LUNARBASE\docker\personalsite\site and ...\app (only
#      changed files; files no longer in the build are removed).
#   4. Copies docker-compose.yml next to them.
# Afterwards, restart the containers in DSM: Container Manager -> Project ->
# personalsite -> Action -> Restart (the site is then down for a few seconds).
#
# The .env file with the database password is NOT touched; it only exists on
# the NAS (see deploy/.env.example).
# ════════════════════════════════════════════════════════════════════════════

param(
    # The NAS folder that holds docker-compose.yml, .env, site/, app/ and keys/
    # Uses the NAS name, not its IP: Windows keeps the share sign-in per server
    # name, and the sign-in for the mapped Z: drive is for \\LUNARBASE.
    [string]$Target = '\\LUNARBASE\docker\personalsite',

    [ValidateSet('all', 'site', 'v1')]
    [string]$Only = 'all'
)

# Stop at the first error instead of continuing with a half-finished deploy
$ErrorActionPreference = 'Stop'

# Publishes one project and mirrors it into a folder on the NAS.
function Publish-Site {
    param([string]$Project, [string]$Folder, [string[]]$Skip)

    $publish = Join-Path $env:TEMP "personalsite-publish-$Folder"
    if (Test-Path $publish) { Remove-Item $publish -Recurse -Force }
    dotnet publish (Join-Path $PSScriptRoot $Project) -c Release -o $publish
    if ($LASTEXITCODE -ne 0) { throw "dotnet publish failed for $Project." }

    # Development-only and Windows-only files are not needed on the NAS
    foreach ($name in @('appsettings.Development.json', 'web.config') + $Skip) {
        Remove-Item (Join-Path $publish $name) -ErrorAction SilentlyContinue
    }

    $dest = Join-Path $Target $Folder
    Write-Host "     Copying to $dest ..."
    New-Item -ItemType Directory -Force $dest | Out-Null

    # The site is usually still running while we copy. Overwriting a file in place
    # changes it under the running program, which then crashes on anything it hadn't
    # loaded yet (pages and images start failing with an empty "500" error).
    # So first DELETE every file that is about to be replaced: the running site
    # keeps its already-open copy of the old file (Linux allows that) until the
    # restart, and robocopy then writes the new file as a fresh copy.
    Get-ChildItem $publish -Recurse -File | ForEach-Object {
        $old = Join-Path $dest $_.FullName.Substring($publish.Length).TrimStart('\')
        if (Test-Path -LiteralPath $old) { Remove-Item -LiteralPath $old -Force }
    }
    # robocopy /MIR = make the target an exact mirror of the source.
    # /NFL /NDL /NJH /NP = less output. Exit codes below 8 mean success.
    robocopy $publish $dest /MIR /NFL /NDL /NJH /NP /R:2 /W:2 | Out-Null
    if ($LASTEXITCODE -ge 8) { throw "robocopy failed with exit code $LASTEXITCODE." }
    # robocopy's codes 1-7 mean success; reset so the script itself ends with 0
    $global:LASTEXITCODE = 0
}

if ($Only -in 'all', 'site') {
    Write-Host '1/4  Building the React app...'
    Push-Location (Join-Path $PSScriptRoot 'site\client')
    try {
        # "npm ci" installs exactly the package versions in package-lock.json
        npm ci
        if ($LASTEXITCODE -ne 0) { throw 'npm ci failed.' }
        npm run build
        if ($LASTEXITCODE -ne 0) { throw 'npm run build failed.' }
    }
    finally { Pop-Location }

    Write-Host '2/4  Publishing the new site (Release)...'
    Publish-Site -Project 'site' -Folder 'site' -Skip 'Lundqwist.Site.exe'
}

if ($Only -in 'all', 'v1') {
    Write-Host '3/4  Publishing the first version (Release)...'
    Publish-Site -Project 'v1' -Folder 'app' -Skip 'PersonalSite.exe'
    New-Item -ItemType Directory -Force (Join-Path $Target 'keys'), (Join-Path $Target 'showcase') | Out-Null
}

Write-Host '4/4  Copying docker-compose.yml ...'
Copy-Item (Join-Path $PSScriptRoot 'deploy\docker-compose.yml') (Join-Path $Target 'docker-compose.yml') -Force

if (-not (Test-Path (Join-Path $Target '.env'))) {
    Write-Warning "No .env file in $Target yet. Copy deploy\.env.example there as .env and fill in the password."
}

Write-Host ''
Write-Host 'Done. Now restart in DSM: Container Manager -> Project -> personalsite -> Action -> Restart.'
Write-Host 'If docker-compose.yml changed (for example the first deploy of the new site): Stop the project, then Build.'
Write-Host 'Until you restart, the sites keep running the previous version.'
