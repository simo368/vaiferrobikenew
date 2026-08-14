$svgLogo = '<span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="44" r="10" class="wheel-spin"/><circle cx="50" cy="44" r="10" class="wheel-spin"/><path d="M14 44L26 22h12l12 22M26 22l6 22M38 22l-8 22"/><path d="M34 14h10M44 14l-6 8"/></svg></span>'

$files = Get-ChildItem -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    # Sostituisci il logo nell'header
    $content = $content -replace '<span class="brand-mark" aria-hidden="true"><img src="img/logo-bici\.jpg".*?</span>', $svgLogo
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}
Write-Output "Fatto!"
