import { StyleSheet, View, Text, useColorScheme } from 'react-native'

export default function SettingsSection({ title, children }) {
  const colorScheme = useColorScheme()

  const labelColor = colorScheme == 'dark' ? '#999' : 'grey'

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.label, color: labelColor }}>{title}</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    flexDirection: 'column',
  },
  label: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
})
