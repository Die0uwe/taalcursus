# Aprende Papiamentu - audio-generator (facebook/mms-tts-pap)
# Bouwen (vanuit de projectmap):   docker build -t pap-audio -f tools/Dockerfile .
FROM python:3.11-slim

RUN apt-get update \
 && apt-get install -y --no-install-recommends ffmpeg \
 && rm -rf /var/lib/apt/lists/*

# CPU-versie van PyTorch (klein, geen GPU nodig voor ~40 korte woorden)
RUN pip install --no-cache-dir torch --index-url https://download.pytorch.org/whl/cpu \
 && pip install --no-cache-dir transformers scipy numpy

ENV HF_HOME=/hf_cache
WORKDIR /work
ENTRYPOINT ["python", "tools/maak_audio.py"]
