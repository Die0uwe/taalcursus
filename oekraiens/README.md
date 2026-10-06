# Leer Oekraïens! (Українська)

Created by DieOuwe · www.dieouwe.nl

Cursus **Oekraïens** van de Taalcursus, versie 0.5.0. Zelfde opzet als `papiamento/`: leren, quiz, sterren en badges, app (PWA) en offline.

- 42 woorden in 5 categorieën, elk met emoji, woord, Nederlands en uitspraakgids. Woorden aanpassen: `tools/talen.py` (en dan `python tools/maak_cursus.py oekraiens --force`) of direct `js/words.js`.
- **Geluid:** de stem van de browser of het apparaat (taalcode `uk-UA`). Eigen mp3's gaan voor: `mp3/vrouw/<id>.mp3` (echte opname) of `mp3/mms/<id>.mp3` (computerstem).
- Computerstem maken (Docker, zie `tools/Dockerfile`): model `facebook/mms-tts-ukr`, licentie CC BY-NC 4.0. Controleer de licentie en pas `NOTICE.md` en de footer aan als je ze gebruikt.
- Opslagsleutel in `localStorage`: `oekraiens.v1`.
- Eigen plaatjes: `img/<id>.png` (zie `img/LEESMIJ.md`). De ids zijn Nederlandse woorden (zon, maan, hond ...) en gelijk in alle cursussen.
- **Let op:** woorden en uitspraak zijn nog niet door een moedertaalspreker gecontroleerd (status `check`).

Hoofdpagina: `../index.html`. Hoe voeg je nog een taal toe: `../docs/NIEUWE-CURSUS.md`.
