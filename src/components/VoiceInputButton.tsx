// Make sure to install:
// npm install @react-native-voice/voice

import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
// Import Voice with its types
import Voice, { 
  SpeechResultsEvent, 
  SpeechErrorEvent 
} from '@react-native-voice/voice';

interface VoiceInputButtonProps {
  onSpeechResult: (text: string) => void;
}

const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({ onSpeechResult }) => {
  const [isListening, setIsListening] = useState(false);
  
  useEffect(() => {
    function onSpeechResults(e: SpeechResultsEvent) {
      if (e.value && e.value.length > 0) {
        onSpeechResult(e.value[0]);
        setIsListening(false);
      }
    }
    
    function onSpeechError(e: SpeechErrorEvent) {
      console.error('Speech recognition error:', e);
      setIsListening(false);
    }
    
    // Initialize voice recognition
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    
    return () => {
      // Cleanup
      Voice.destroy().then(() => {
        Voice.removeAllListeners();
      });
    };
  }, [onSpeechResult]);
  
  const startListening = async () => {
    try {
      setIsListening(true);
      await Voice.start('en-US');
    } catch (e) {
      console.error('Failed to start voice recognition:', e);
      setIsListening(false);
    }
  };
  
  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {
      console.error('Failed to stop voice recognition:', e);
    }
  };
  
  return (
    <TouchableOpacity 
      style={[styles.button, isListening && styles.listeningButton]} 
      onPress={isListening ? stopListening : startListening}
      accessibilityLabel={isListening ? "Listening" : "Start voice input"}
      accessibilityHint="Double tap to start voice recognition"
    >
      <Text style={styles.buttonText}>
        {isListening ? "Listening..." : "🎤"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#EEEEEE',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  listeningButton: {
    backgroundColor: '#FF4444',
  },
  buttonText: {
    fontSize: 18,
  },
});

export default VoiceInputButton;
