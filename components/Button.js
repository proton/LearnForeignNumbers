import { StyleSheet, View, Pressable, Text, PixelRatio } from 'react-native'

export default function Button({ label, onPress }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18,
  },
  buttonLabel: {
    fontSize: PixelRatio.get() * 14,
    color: '#25292e',
  },
})
