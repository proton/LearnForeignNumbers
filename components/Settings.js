import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, PixelRatio, Button, ScrollView } from 'react-native'
// import RNPickerSelect from 'react-native-picker-select'
// import SelectDropdown from 'react-native-select-dropdown'
// import {Picker} from '@react-native-picker/picker'
import DropDownPicker from 'react-native-dropdown-picker'



export default function Settings() {
  // useEffect(() => {
  //   if (number === null) changeNumber()
  // })


  const [language, setLanguage] = useState('en')
  const languages = [
    { value: 'ar', label: 'Arabic' },
    { value: 'az', label: 'Azerbaijani' },
    { value: 'cz', label: 'Czech' },
    { value: 'dk', label: 'Danish' },
    { value: 'de', label: 'German' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
    { value: 'fa', label: 'Farsi' },
    { value: 'he', label: 'Hebrew' },
    { value: 'hr', label: 'Croatian' },
    { value: 'hu', label: 'Hungarian' },
    { value: 'id', label: 'Indonesian' },
    { value: 'it', label: 'Italian' },
    { value: 'ko', label: 'Korean' },
    { value: 'lt', label: 'Lithuanian' },
    { value: 'lv', label: 'Latvian' },
    { value: 'nl', label: 'Dutch' },
    { value: 'no', label: 'Norwegian' },
    { value: 'pl', label: 'Polish' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ru', label: 'Russian' },
    { value: 'sr', label: 'Serbian' },
    { value: 'es', label: 'Spanish' },
    { value: 'tr', label: 'Turkish' },
    { value: 'uk', label: 'Ukrainian' },
    { value: 'vi', label: 'Vietnamese' },
    { value: 'zh', label: 'Chinese' },
  ]

  const [languageSelectOpen, setLanguageSelectOpen] = useState(false)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Language:</Text>

      <DropDownPicker
        open={languageSelectOpen}
        value={language}
        items={languages}
        setOpen={setLanguageSelectOpen}
        setValue={setLanguage}
      />

      <Text>Other:</Text>

      <Button title='Start' color='red'></Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    flexShrink: 0,
    flexGrow: 1,
  },
})
