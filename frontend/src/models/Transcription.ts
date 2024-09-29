export type TranscriptionResponse = {
  transcript: string
  subtitles: string
}

export type Sentiment = {
  emotions: {
    kind: string // typ emocji, np. 'neutral', 'positive', 'negative'
  }
  hateSpeech: boolean // informacja o mowie nienawiści
}

export type TranscriptionAnalysis = {
  fog_message: string // komunikat o zrozumiałości
  fog_score: number // wynik zrozumiałości
  sentiment: Sentiment // obiekt analizy sentymentu
  targetGroup: string // grupa docelowa
  grammarScore: number // wynik gramatyczny
  tooManyNumbers: boolean // czy jest za dużo liczb
  hasJargon: boolean // czy jest żargon
  hasForeignLanguage: boolean // czy jest język obcy
  hasNonExistentWords: boolean // czy są nieistniejące słowa
  isPassive: boolean // czy użyto strony biernej
  tooManyRepetitions: boolean // czy jest za dużo powtórzeń
  hasTopicChange: boolean // czy nastąpiła zmiana tematu
}
