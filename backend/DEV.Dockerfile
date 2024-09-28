FROM python:3.12

# Install FFmpeg
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV PYTHONPATH="/app/src"
ARG OPENAI_API_KEY

COPY . /app

RUN pip install -r requirements.txt

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "7860", "--reload"]