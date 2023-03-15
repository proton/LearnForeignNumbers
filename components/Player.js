import n2words     from 'n2words'
import * as Speech from 'expo-speech'

export default class Player {
  constructor({ voice, language }) {
    this.voice = voice
    this.language = language
  }

  sayNumber(number) {
    if (!this.voicePresent()) return
    const text = this.numberToText(number)
    Speech.stop()
    Speech.speak(text, { language: this.language, voice: this.voice })
  }

  numberToText(number) {
    return n2words(number, { lang: this.language })
  }

  voicePresent() {
    return this.voice && this.voice !== '-'
  }
}
