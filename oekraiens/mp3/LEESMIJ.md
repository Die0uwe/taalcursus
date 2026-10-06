# mp3/: geluid per woord

Bestandsnaam = het woord-id uit `js/words.js` plus `.mp3` (kleine letters, zonder accenten):
`Hond` is `hond.mp3`, `Zus` is `zus.mp3`.

De app zoekt per woord in deze volgorde en speelt de eerste die bestaat:

1. `mp3/vrouw/<id>.mp3`  echte opname (wint altijd)
2. `mp3/mms/<id>.mp3`    computerstem
3. `mp3/<id>.mp3`        losse mp3 (oude opzet, blijft werken)
4. computerstem van de browser, anders "nog geen geluid"
