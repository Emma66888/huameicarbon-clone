@echo off
cd /d "G:\workbuddy\my site\my-site"
"C:\Program Files\Git\cmd\git.exe" config --global user.email "emma66888@github.com"
"C:\Program Files\Git\cmd\git.exe" config --global user.name "Emma66888"
"C:\Program Files\Git\cmd\git.exe" init
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "Initial commit: cloned huameicarbon.com static site"
"C:\Program Files\Git\cmd\git.exe" branch -M main
"C:\Program Files\Git\cmd\git.exe" remote add origin https://github.com/Emma66888/huameicarbon-clone.git
"C:\Program Files\Git\cmd\git.exe" push -u origin main
echo Done!
pause
