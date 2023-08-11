import { useState }                  from 'react'
import { StyleSheet, useColorScheme} from 'react-native'
import { Dropdown }                  from 'react-native-element-dropdown'

export default function SettingsSelect({ prefs, value, values, onChange, disabled }) {
  const colorScheme = useColorScheme()
  const theme = prefs.theme || colorScheme

  const [isOpen, setIsOpen] = useState(false)

  const containerTheme =
    theme === 'dark' ? {
      backgroundColor: '#121212',
      color:           '#cfcfcf',
      padding:         0,
    } : {
      backgroundColor: '#eee',
      color:           'white',
      padding:         0,
    }

  const activeBackgroundColor = theme === 'dark' ? '#222222' : '#ddd'

  return (
    <Dropdown
      style={[styles.dropdown, isOpen && { borderColor: 'red' }]}
      containerStyle={{ ...styles.containerStyle, ...containerTheme }}
      selectedTextStyle={prefs.styles.settingsText}
      itemContainerStyle={containerTheme}
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
  },
  dropdown: {
    flexGrow: 1,
  },
})

