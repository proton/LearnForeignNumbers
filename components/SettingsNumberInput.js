import { StyleSheet, TextInput } from 'react-native'

export default function SettingNumberInput(props) {
  const { value, onChange, inputRef } = props

  return (
    <TextInput
      ref={inputRef}
      style={styles.element}
      onChange={number => onChange(+number)}
      value={value.toString()}
      inputMode='numeric'
      keyboardType='numeric'
    />
  )
}

const styles = StyleSheet.create({
  element: {
    width: 90,
    textAlign: 'right',
    fontSize: 20,
  },
})
