# mp3/: geluid per woord

Bestandsnaam = het woord-id uit `js/words.js` plus `.mp3` (kleine letters, zonder accenten):
`Kachó` is `kacho.mp3`, `Ruman muhé` is `rumanmuhe.mp3`.

De app zoekt per woord in deze volgorde en speelt de eerste die bestaat:

1. `mp3/vrouw/<id>.mp3`  echte opname (wint altijd)
2. `mp3/mms/<id>.mp3`    computerstem
3. `mp3/<id>.mp3`        losse mp3 (oude opzet, blijft werken)
4. computerstem van de browser, anders "nog geen geluid"

Per eiland: voor Aruba of Bonaire zet je een afwijkende uitspraak in een submap, bijvoorbeeld
`mp3/vrouw/aw/kas.mp3`. Curaçao staat direct in de stem-map.
