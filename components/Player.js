import n2words      from 'n2words'
import * as Speech  from 'expo-speech'
import { Platform } from 'react-native'
import { Audio }    from 'expo-av'

export default class Player {
  constructor({ voice, language }) {
    this.voice = voice
    this.language = language
    this.enableSound()
  }

  async enableSound() {
    if (Platform.OS === 'ios') {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      })
      const soundObject = new Audio.Sound()
      await soundObject.loadAsync(require('../assets/empty.mp3'))
      await soundObject.playAsync()
    }
  }

  async sayNumber(number) {
    if (!this.voicePresent()) return
    const text = this.numberToText(number)
    if (await Speech.isSpeakingAsync()) Speech.stop()
    Speech.speak(text, { language: this.language, voice: this.voice })
  }

  numberToText(number) {
    return n2words(number, { lang: this.language })
  }

  voicePresent() {
    return this.voice && this.voice !== '-'
  }
}
