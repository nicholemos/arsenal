$modal = Get-Content modal.txt -Raw
$content = Get-Content index.html -Raw
$content = $content -replace '</body>', "$modal`n</body>"
Set-Content index.html -Value $content -NoNewline
