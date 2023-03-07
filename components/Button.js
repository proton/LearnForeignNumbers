import { StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native'
import { Feather }                                            from '@expo/vector-icons'

const Button = ({ prefs, onPress, icon, title, color, style }) => {
  const colorScheme = useColorScheme()
  const theme = prefs.theme || colorScheme

  const textColor = theme === 'dark' ? '#ccc' : 'white'
  let backgroundColor

  if (color == 'red') {
    backgroundColor = theme === 'dark' ? '#B00020' : 'red'
  } else if (color == 'blue') {
    backgroundColor = theme === 'dark' ? '#3700B3' : '#2196F3'
  } else if (color == 'grey') {
    backgroundColor = theme === 'dark' ? '#333333' : '#777777'
  }

  const containerStyles = { ...styles.container, ...style, backgroundColor }
  const textStyles = { ...styles.text, color: textColor }

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress} activeOpacity={0.8}>
      {icon && <Feather name={icon} size={24} color="white" />}
      {title && <Text style={textStyles}>{title}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
})

export default Button
