from unittest.mock import patch
from text_analysis.fog import get_message_based_on_fog_score_simplified, fog

def test_get_message_based_on_fog_score_simplified():

  assert get_message_based_on_fog_score_simplified(0.5) == "Wypowiedź jest zbyt krótka, aby ocenić jej zrozumiałość."

  assert get_message_based_on_fog_score_simplified(10) == "Wypowiedź jest prosta do zrozumienia."

  assert get_message_based_on_fog_score_simplified(14) == "Wypowiedź jest umiarkowanie trudna do zrozumienia."

  assert get_message_based_on_fog_score_simplified(16) == "Wypowiedź jest trudna do zrozumienia."

def test_fog():
  text = "This is a simple test sentence."

  with patch('textstat.gunning_fog', return_value=8.0):
    result = fog(text)
    assert result['message'] == "Wypowiedź jest prosta do zrozumienia."
    assert result['fog_score'] == 8.0

  with patch('textstat.gunning_fog', return_value=15.5):
    result = fog(text)
    assert result['message'] == "Wypowiedź jest trudna do zrozumienia."
    assert result['fog_score'] == 15.5
