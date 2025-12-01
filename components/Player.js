import n2words               from 'n2words'
import * as Speech           from 'expo-speech'
import { setAudioModeAsync } from 'expo-audio'

export default class Player {
  constructor({ voice, language, muted }) {
    this.voice = voice
    this.language = language
    this.muted = muted
    this.configureAudio()
  }

  async configureAudio() {
    await setAudioModeAsync({
      playsInSilentMode:       true,
      shouldPlayInBackground:  true,
      interruptionModeAndroid: 'duckOthers',
      interruptionMode:        'mixWithOthers',
    })
  }

  async sayNumber(number) {
    if (this.silent()) return
    const text = this.numberToText(number)
    if (await Speech.isSpeakingAsync()) Speech.stop()
    Speech.speak(text, { language: this.language, voice: this.voice })
  }

  numberToText(number) {
    return n2words(number, { lang: this.language })
  }

  silent() {
    return this.muted || !this.voiced()
  }

  voiced() {
    return this.voice && this.voice !== '-'
  }
}
