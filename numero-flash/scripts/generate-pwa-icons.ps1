Add-Type -AssemblyName System.Drawing

function New-NfIcon {
  param([int]$Size)

  $bmp = New-Object System.Drawing.Bitmap $Size, $Size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

  $bg = [System.Drawing.Color]::FromArgb(255, 8, 26, 58)
  $g.Clear($bg)

  $fontSize = [math]::Round($Size * 0.41)
  $font = New-Object System.Drawing.Font(
    'Segoe UI',
    $fontSize,
    [System.Drawing.FontStyle]::Bold,
    [System.Drawing.GraphicsUnit]::Pixel
  )
  $brushN = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 248, 251, 255))
  $brushF = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 255, 208, 51))

  $nSize = $g.MeasureString('N', $font)
  $fSize = $g.MeasureString('F', $font)
  $totalW = $nSize.Width + $fSize.Width
  $x = ($Size - $totalW) / 2
  $y = ($Size - $nSize.Height) / 2

  $g.DrawString('N', $font, $brushN, $x, $y)
  $g.DrawString('F', $font, $brushF, ($x + $nSize.Width), $y)

  $publicDir = Join-Path $PSScriptRoot '..\public'
  $path = Join-Path $publicDir "icon-$Size.png"
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)

  $g.Dispose()
  $bmp.Dispose()
  $font.Dispose()
  $brushN.Dispose()
  $brushF.Dispose()

  Write-Output "Wrote $path"
}

New-NfIcon -Size 192
New-NfIcon -Size 512
