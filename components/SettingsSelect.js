import { useState }   from 'react'
import { StyleSheet } from 'react-native'
import { Dropdown }   from 'react-native-element-dropdown'

export default function SettingsSelect({ prefs, value, values, onChange, disabled }) {
  const [isOpen, setIsOpen] = useState(false)

  const theme = prefs.computedTheme
  const activeBackgroundColor = theme === 'dark' ? '#222222' : '#ddd'

  return (
    <Dropdown
      style={[styles.dropdown, isOpen && { borderColor: 'red' }]}
      containerStyle={{ ...styles.containerStyle, ...prefs.styles.settingsSelectContainer }}
      selectedTextStyle={prefs.styles.settingsText}
      itemContainerStyle={prefs.styles.settingsSelectContainer}
      activeColor={activeBackgroundColor}
      itemTextStyle={prefs.styles.settingsText}
      data={values}
      disable={disabled}
      labelField="label"
      valueField="value"
      searchField="label"
      value={value}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      onChange={item => {
        onChange(item.value)
        setIsOpen(false)
      }}
    />
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    minHeight: 48, // https://support.google.com/accessibility/android/answer/7101858
  },
  dropdown: {
    flexGrow: 1,
  },
})

