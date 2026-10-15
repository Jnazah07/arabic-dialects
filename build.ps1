# Build script: produces a single self-contained HTML file and a zip bundle.
# Run from the arabic-duolingo folder: powershell -File build.ps1

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$utf8 = New-Object System.Text.UTF8Encoding($false)

function Read-Text($path) { [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8) }
function Write-Text($path, $text) { [System.IO.File]::WriteAllText($path, $text, $utf8) }

$css = Read-Text (Join-Path $root 'css/style.css')
$js = @(
    (Read-Text (Join-Path $root 'data/dialects.js')),
    (Read-Text (Join-Path $root 'data/lessonData.js')),
    (Read-Text (Join-Path $root 'js/app.js'))
) -join "`n"

$html = Read-Text (Join-Path $root 'index.html')

# Inline the stylesheet.
$html = $html -replace '<link rel="stylesheet" href="css/style\.css">', "<style>`n$css`n</style>"

# Inline the three scripts, in order.
$scriptTags = @(
    '<script src="data/dialects.js"></script>',
    '<script src="data/lessonData.js"></script>',
    '<script src="js/app.js"></script>'
)
$html = $html -replace [regex]::Escape($scriptTags[0]), "<script>`n$js`n</script>"
$html = $html -replace [regex]::Escape($scriptTags[1]), ''
$html = $html -replace [regex]::Escape($scriptTags[2]), ''

# A standalone file cannot use the manifest or service worker.
$html = $html -replace '<link rel="manifest" href="manifest\.webmanifest">', ''
$html = $html -replace '(?s)\s*// PWA: register the service worker.*?\n\s*\}\n', "`n"

$singlePath = Join-Path $root 'arabic-dialects-single.html'
Write-Text $singlePath $html
Write-Host ("Single file: {0} ({1:N0} bytes)" -f $singlePath, (Get-Item $singlePath).Length)

# Zip bundle (everything except the build script itself and the single file).
$zipPath = Join-Path $root 'arabic-dialects.zip'
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
$files = Get-ChildItem -Path $root -Recurse -File |
    Where-Object { $_.Name -ne 'arabic-dialects.zip' -and $_.Name -ne 'build.ps1' -and $_.Name -ne 'arabic-dialects-single.html' }
Compress-Archive -Path $files.FullName -DestinationPath $zipPath -Force
Write-Host ("Zip: {0} ({1:N0} bytes, {2} files)" -f $zipPath, (Get-Item $zipPath).Length, $files.Count)
