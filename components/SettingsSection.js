import { StyleSheet, View, Text } from 'react-native'

export default function SettingsSection(props) {
  const { title, children } = props

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
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
