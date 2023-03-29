import Button    from './Button'
import Translate from './Translate'

const MuteButton = ({ prefs, saveSettings, style }) => {
  const { locale, muted } = prefs
  const tr = Translate(locale)

  const icon = muted ? 'Feather/volume-x' : 'Feather/volume-2'
  const accessibilityLabel = muted ? 'unmute' : 'mute'

  const toggleMute = _ => saveSettings({ muted: !muted })

  return (
    <Button
      prefs={prefs}
      icon={icon}
      accessibilityLabel={tr(accessibilityLabel)}
      onPress={toggleMute}
      color="grey"
      style={style}
    />
  )
}

export default MuteButton
