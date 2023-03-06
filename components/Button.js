// import { StyleSheet, Text, TouchableOpacity } from 'react-native'

// export default function Button({ onPress, title, size, backgroundColor }) {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={[
//         styles.appButtonContainer,
//         size === 'sm' && {
//           paddingHorizontal: 8,
//           paddingVertical: 6,
//           elevation: 6,
//         },
//         backgroundColor && { backgroundColor },
//       ]}
//     >
//       <Text style={[styles.appButtonText, size === 'sm' && { fontSize: 14 }]}>
//         {title}
//       </Text>
//     </TouchableOpacity>
//   )
// }



//////////////
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Feather }                            from '@expo/vector-icons'


const Button = ({ onPress, icon, title, backgroundColor, style }) => {
  const containerStyles = { ...styles.container, ...style }
  if (backgroundColor) containerStyles.backgroundColor = backgroundColor

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress} activeOpacity={0.8}>
      {icon && <Feather name={icon} size={24} color="white" />}
      {title && <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#555',
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
