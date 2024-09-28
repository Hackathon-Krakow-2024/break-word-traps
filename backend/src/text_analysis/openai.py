from openai import OpenAI
import json
import os
from fastapi import HTTPException

model_name = "gpt-3.5-turbo"

def prompt_ai(text: str):
  api_key = os.getenv("OPENAI_API_KEY")
  client = OpenAI(api_key=api_key)
  prompt = f"""
  Tekst={text}
  Dokonaj analizy w następujących kategoriach:
  Sentyment: emocje, ton, mowa nienawiści.
  Czy zawiera za dużo liczb - powyżej 10% całego tekstu?
  Czy zawiera za dużo powtórzeń - powyżej 10% całego tekstu?
  Czy zawiera żargon?
  Czy jest użyty język inny niż polski?
  Czy zawiera nieistniejące słowa?
  Czy jest w formie pasywnej?
  Czy zmienia się zbyt często temat?
  Grupa docelowa: wiek, wykształcenie.
  Ocena gramatyczna: wstęp, rozwinięcie, zakończenie.
  Zwróć output jako JSON string w następującej strukturze:
  {{
  "sentiment": {{
    "emotions": {{
      "kind": "string"
      "score": "float" // 1 to ekstreamlnie negatywny, 10 to ekstremalnie pozytywny
    }}
    "hateSpeech": "boolean"
  }},
  "targetGroup": "string"
  "grammarScore: "float" // 1-10
  "tooManyNumbers": "boolean",
  "hasJargon": "boolean",
  "hasForeignLanguage": "boolean",
  "hasNonExistentWords": "boolean",
  "isPassive": "boolean",
  "tooManyRepetitions": "boolean",
  "hasTopicChange": "boolean"
  }}
"""

  completion = client.chat.completions.create(
    model=model_name,
    messages=[
    {
      "role": "system",
      "content": [
        {
          "type": "text",
          "text": "Bądź analitykiem językowym."
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": prompt
        }
      ]
    }
  ],
  temperature=0,
  max_tokens=2048,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0,
  response_format={
    "type": "text"
  }
)

  try:
    return json.loads(completion.choices[0].message.content)
  except json.JSONDecodeError as e:
    print(f"JSON decoding error: {e.msg} at line {e.lineno} column {e.colno}")
    raise HTTPException(status_code=400, detail="Something went wrong.")
