import { StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native'
import { Feather }                                            from '@expo/vector-icons'

const Button = ({ onPress, icon, title, color, style }) => {
  const colorScheme = useColorScheme()

  const textColor = colorScheme == 'dark' ? '#ccc' : 'white'
  let backgroundColor

  if (color == 'red') {
    backgroundColor = colorScheme == 'dark' ? '#B00020' : 'red'
  } else if (color == 'blue') {
    backgroundColor = colorScheme == 'dark' ? '#3700B3' : '#2196F3'
  } else if (color == 'grey') {
    backgroundColor = colorScheme == 'dark' ? '#333333' : '#777777'
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
