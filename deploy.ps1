# CGC Deployment Helper Script
# Ambo University, Woliso Campus

param(
    [string]$RepoName = "cgc-website"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CGC Website - GitHub & Vercel Deploy" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# 1. Check Git Status
Write-Host "`n[1/3] Checking Git Status..." -ForegroundColor Yellow
git status

# 2. Configure Remote if not set
$remotes = git remote
if ($remotes -notcontains "origin") {
    $remoteUrl = "https://github.com/YUD-west/$RepoName.git"
    Write-Host "`n[2/3] Adding git remote origin: $remoteUrl" -ForegroundColor Yellow
    git remote add origin $remoteUrl
} else {
    Write-Host "`n[2/3] Remote 'origin' already exists." -ForegroundColor Green
}

# 3. Push to GitHub
Write-Host "`n[3/3] Pushing to main branch on GitHub..." -ForegroundColor Yellow
Write-Host "Run this command to push whenever your GitHub repository is ready:" -ForegroundColor Cyan
Write-Host "git push -u origin main" -ForegroundColor White

Write-Host "`n--- Vercel Direct Deploy Command ---" -ForegroundColor Yellow
Write-Host "To deploy straight to https://vercel.com/yud-wests-projects, run:" -ForegroundColor Cyan
Write-Host "`$env:NODE_TLS_REJECT_UNAUTHORIZED='0'; vercel --prod" -ForegroundColor White
