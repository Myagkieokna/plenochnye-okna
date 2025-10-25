$ProjectDir = "D:\plenochnye-okna-main"
$ArchiveName = "plenochnye-okna-main.zip"

Write-Host "=== BUILD ARCHIVE START ==="

# Удаляем старый архив, если есть
if (Test-Path "$ProjectDir\$ArchiveName") {
    Remove-Item "$ProjectDir\$ArchiveName"
}

# Архивируем всё, кроме node_modules, .nuxt, .output и deploy.sh
$exclude = @("node_modules","*.nuxt","*.output")
$files = Get-ChildItem -Path $ProjectDir -Recurse -File | Where-Object { $exclude -notcontains $_.Directory.Name -and $exclude -notcontains $_.Name }
Compress-Archive -Path $files.FullName -DestinationPath "$ProjectDir\$ArchiveName"

Write-Host "=== BUILD ARCHIVE FINISHED ==="
Write-Host "Архив готов: $ProjectDir\$ArchiveName"
