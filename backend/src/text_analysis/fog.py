import textstat

def get_message_based_on_fog_score_simplified(fog_score: float) -> str:
  if fog_score < 1:
    return "Wypowiedź jest zbyt krótka, aby ocenić jej zrozumiałość."
  elif fog_score <= 12:
    return "Wypowiedź jest prosta do zrozumienia."
  elif fog_score <= 15:
    return "Wypowiedź jest umiarkowanie trudna do zrozumienia."
  else:
    return "Wypowiedź jest trudna do zrozumienia."


# https://pl.wikipedia.org/wiki/Indeks_czytelno%C5%9Bci_FOG
def fog(text: str) -> dict:
  fog_score = textstat.gunning_fog(text)
  message = get_message_based_on_fog_score_simplified(fog_score)
  return {
    "message": message,
    "fog_score": fog_score
  }