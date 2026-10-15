# Build assets/icon.ico from the 512px PNG, with multiple sizes.
# ICO entries are PNG-compressed (supported by Windows Vista and later).

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path $PSScriptRoot -Parent
$src = Join-Path $root 'assets\icon-512.png'
$out = Join-Path $root 'assets\icon.ico'

if (-not (Test-Path $src)) { throw "Source icon not found: $src" }

$source = [System.Drawing.Image]::FromFile($src)
$sizes = @(16, 32, 48, 64, 128, 256)
$pngs = @()

foreach ($s in $sizes) {
    $bmp = New-Object System.Drawing.Bitmap($s, $s)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($source, 0, 0, $s, $s)
    $g.Dispose()

    $ms = New-Object System.IO.MemoryStream
    $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
    $pngs += , ($ms.ToArray())
    $bmp.Dispose()
    $ms.Dispose()
}
$source.Dispose()

# Assemble the ICO container.
$fs = [System.IO.File]::Create($out)
$bw = New-Object System.IO.BinaryWriter($fs)

$bw.Write([UInt16]0)                 # reserved
$bw.Write([UInt16]1)                 # type: icon
$bw.Write([UInt16]$sizes.Count)      # image count

$offset = 6 + (16 * $sizes.Count)
for ($i = 0; $i -lt $sizes.Count; $i++) {
    $s = $sizes[$i]
    $data = $pngs[$i]
    $dim = if ($s -ge 256) { 0 } else { $s }   # 0 encodes 256
    $bw.Write([Byte]$dim)            # width
    $bw.Write([Byte]$dim)            # height
    $bw.Write([Byte]0)               # palette
    $bw.Write([Byte]0)               # reserved
    $bw.Write([UInt16]1)             # color planes
    $bw.Write([UInt16]32)            # bits per pixel
    $bw.Write([UInt32]$data.Length)  # size of PNG data
    $bw.Write([UInt32]$offset)       # offset of PNG data
    $offset += $data.Length
}
foreach ($data in $pngs) { $bw.Write($data) }

$bw.Flush()
$bw.Close()
$fs.Close()

Write-Host ("Wrote {0} ({1:N0} bytes, sizes: {2})" -f $out, (Get-Item $out).Length, ($sizes -join ', '))
