import { StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native'
import { AntDesign, Feather, Foundation }                     from '@expo/vector-icons'

const Button = ({ prefs, onPress, icon, title, color, style }) => {
  const colorScheme = useColorScheme()
  const theme = prefs.theme || colorScheme

  let iconGroup, iconName
  if (icon) {
    [iconGroup, iconName] = icon.split('/')
  }

  const textColor = theme === 'dark' ? '#cfcfcf' : 'white'
  let backgroundColor

  if (color == 'red') {
    backgroundColor = theme === 'dark' ? '#B00020' : 'red'
  } else if (color == 'blue') {
    backgroundColor = theme === 'dark' ? '#3700B3' : '#2196F3'
  } else if (color == 'grey') {
    backgroundColor = theme === 'dark' ? '#333333' : '#808080'
  } else if (color == 'ebony') {
    backgroundColor = theme === 'dark' ? '#292d3e' : '#8990ad'
  } else {
    backgroundColor = color
  }

  const containerStyles = { ...styles.container, ...style, backgroundColor }
  const textStyles = { ...styles.text, color: textColor }

  let IconTag
  if      (iconGroup == 'AntDesign')  IconTag = AntDesign
  else if (iconGroup == 'Feather')    IconTag = Feather
  else if (iconGroup == 'Foundation') IconTag = Foundation

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress} activeOpacity={0.8}>
      { IconTag && <IconTag name={iconName} size={24} color={textColor} style={styles.icon} /> }
      { title   && <Text style={textStyles}>{title}</Text> }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  icon: {
    width: 24,
  },
})

export default Button
