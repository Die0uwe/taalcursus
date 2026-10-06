@echo off
rem Aprende Papiamentu - Created by DieOuwe - www.dieouwe.nl
rem Start een kleine webserver, zodat de app als echte app (installeren, offline, opnemen) werkt.
cd /d "%~dp0"
set POORT=8080
echo.
echo  Aprende Papiamentu draait op:  http://localhost:%POORT%
echo  Opnamestudio:                  http://localhost:%POORT%/tools/studio.html
echo  Stoppen: sluit dit venster of druk op Ctrl+C.
echo.
start "" "http://localhost:%POORT%"
where python >nul 2>nul && ( python -m http.server %POORT% & goto :einde )
where py >nul 2>nul && ( py -m http.server %POORT% & goto :einde )
where docker >nul 2>nul && ( docker run --rm -p %POORT%:80 -v "%cd%":/usr/share/nginx/html:ro nginx:alpine & goto :einde )
echo Python of Docker niet gevonden. Installeer een van beide en probeer opnieuw.
pause
:einde
