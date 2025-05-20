import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { useUserPreferences } from '../context/UserPreferencesContext';
import AccessibleText from '../components/AccessibleText';
import Slider from '@react-native-community/slider';

const SettingsScreen = () => {
  const { preferences, updatePreferences } = useUserPreferences();
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <AccessibleText style={styles.sectionTitle}>Text Settings</AccessibleText>
        
        <View style={styles.setting}>
          <AccessibleText style={styles.settingLabel}>Font Size</AccessibleText>
          <Slider
            style={styles.slider}
            minimumValue={12}
            maximumValue={32}
            step={2}
            value={preferences.fontSize}
            onValueChange={(value) => updatePreferences({ fontSize: value })}
            accessibilityLabel={`Font size: ${preferences.fontSize}`}
          />
          <Text style={styles.valueText}>{preferences.fontSize}</Text>
        </View>
        
        <View style={styles.setting}>
          <AccessibleText style={styles.settingLabel}>High Contrast</AccessibleText>
          <Switch
            value={preferences.highContrast}
            onValueChange={(value) => updatePreferences({ highContrast: value })}
            accessibilityLabel={`High contrast mode: ${preferences.highContrast ? 'on' : 'off'}`}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <AccessibleText style={styles.sectionTitle}>Input & Output</AccessibleText>
        
        <View style={styles.setting}>
          <AccessibleText style={styles.settingLabel}>Voice Input</AccessibleText>
          <Switch
            value={preferences.useVoiceInput}
            onValueChange={(value) => updatePreferences({ useVoiceInput: value })}
            accessibilityLabel={`Voice input: ${preferences.useVoiceInput ? 'on' : 'off'}`}
          />
        </View>
        
        <View style={styles.setting}>
          <AccessibleText style={styles.settingLabel}>Voice Output</AccessibleText>
          <Switch
            value={preferences.useVoiceOutput}
            onValueChange={(value) => updatePreferences({ useVoiceOutput: value })}
            accessibilityLabel={`Voice output: ${preferences.useVoiceOutput ? 'on' : 'off'}`}
          />
        </View>
        
        <View style={styles.setting}>
          <AccessibleText style={styles.settingLabel}>Haptic Feedback</AccessibleText>
          <Switch
            value={preferences.hapticFeedback}
            onValueChange={(value) => updatePreferences({ hapticFeedback: value })}
            accessibilityLabel={`Haptic feedback: ${preferences.hapticFeedback ? 'on' : 'off'}`}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <AccessibleText style={styles.sectionTitle}>Color Settings</AccessibleText>
        
        <View style={styles.setting}>
          <AccessibleText style={styles.settingLabel}>Color Blind Mode</AccessibleText>
          <Text style={styles.valueText}>{preferences.colorBlindMode}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  settingLabel: {
    fontSize: 18,
    color: '#555',
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
    height: 40,
  },
  valueText: {
    fontSize: 16,
    width: 30,
    textAlign: 'right',
    color: '#555',
  },
});

export default SettingsScreen;
