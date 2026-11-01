@echo off
title OUR FRIENDSHIP - 2026 (Domititan, Bendy, Sunny, Mini, Efra)
echo ========================================================
echo   OUR FRIENDSHIP — THE 2026 ADVENTURE 💜
echo   Iniciando modo aplicacion de escritorio Windows...
echo ========================================================
start msedge --app="%~dp0index.html" --window-size=1200,800 || start chrome --app="%~dp0index.html" --window-size=1200,800 || start "" "%~dp0index.html"
exit
