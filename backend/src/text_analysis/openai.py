from openai import OpenAI
import json
import os
from fastapi import HTTPException

model_name = "gpt-3.5-turbo"

def prompt_ai(text: str):
  api_key = os.getenv("OPENAI_API_KEY")
  client = OpenAI(api_key=api_key)
  text = "W budżecie na 2025 rok przeznaczymy ponad 221,7 mld zł na ochronę zdrowia. Wzrost nakładów o 31,7 mld zł (6,1%). 0,5 mld zł na program INVITRO, 0,8 mld zł na świadczenia aktywnych rodziców, 0,62 i 0,8 mld zł na program rodzina 800+."
  prompt = f"""
  Tekst={text}
  Dokonaj analizy w następujących kategoriach:
  Sentyment: emocje, ton, mowa nienawiści.
  Grupa docelowa: wiek, wykształcenie.
  Ocena gramatyczna: wstęp, rozwinięcie, zakończenie.
  Zwróć output w jako JSON string w następującej strukturze:
  {{
  "sentiment": {{
    "emotions": {{
      "kind": "string"
    }}
  }},
  "targetGroup": "string"
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
