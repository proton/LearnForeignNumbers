import { useState }       from 'react'
import { useColorScheme } from 'react-native'
import DropDownPicker     from 'react-native-dropdown-picker'

export default function SettingSelect({ prefs, value, values, onChange, disabled }) {
  const colorScheme = useColorScheme()
  const theme = prefs.theme || colorScheme

  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropDownPicker
      open={isOpen}
      value={value}
      items={values}
      setOpen={setIsOpen}
      setValue={onChange}
      listMode='MODAL'
      theme={theme === 'dark' ? 'DARK' : 'LIGHT'}
      language={prefs.locale.toUpperCase()}
      zIndex={100500}
      zIndexInverse={1000}
      disabled={disabled}
      containerStyle={{width: 'auto', flexGrow: 1}}
      style={{width: 'auto'}}
    />
  )
}
