import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { AntDesign, Feather }                 from '@expo/vector-icons'

const Button = ({ prefs, onPress, icon, title, color, style, accessibilityLabel }) => {

  let iconGroup, iconName
  if (icon) {
    [iconGroup, iconName] = icon.split('/')
  }

  const theme = prefs.computedTheme
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
  if (iconGroup == 'AntDesign') IconTag = AntDesign
  else if (iconGroup == 'Feather') IconTag = Feather

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress} activeOpacity={0.8} accessibilityLabel={accessibilityLabel}>
      { IconTag && <IconTag name={iconName} size={24} color={textColor} style={styles.icon} /> }
      { title && <Text style={textStyles}>{title}</Text> }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems:        'center',
    borderRadius:      10,
    display:           'flex',
    elevation:         8,
    flexDirection:     'row',
    flexWrap:          'nowrap',
    gap:               7,
    justifyContent:    'center',
    // https://support.google.com/accessibility/android/answer/7101858
    minHeight:         48,
    minWidth:          48,
    paddingHorizontal: 12,
    paddingVertical:   10,
  },
  icon: {
    width: 24,
  },
  text: {
    alignSelf:     'center',
    color:         '#fff',
    fontSize:      18,
    fontWeight:    'bold',
    textTransform: 'uppercase',
  },
})

export default Button
