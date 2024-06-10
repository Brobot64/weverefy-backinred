@echo off

rem Define directories (replace with your actual paths)
set "baseDir=C:\Users\Brobot\Documents\Onprojects\weverefyd\"
set "directories=account gateway identity"

rem Loop through each directory
for %%a in (%directories%) do (
  echo Running yarn dev in: %baseDir%\%%a
  cd /d "%baseDir%\%%a" || exit /b 1
  start cmd /c "yarn dev"
)

echo All yarn dev processes started!

pause
