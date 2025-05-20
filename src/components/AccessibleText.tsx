import React from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';
import { useUserPreferences } from '../context/UserPreferencesContext';

interface AccessibleTextProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const AccessibleText: React.FC<AccessibleTextProps> = ({ children, style, ...props }) => {
  const { preferences } = useUserPreferences();
  
  // Apply user preferences to text
  const accessibleStyle = [
    {
      fontSize: preferences.fontSize,
      color: preferences.highContrast ? '#FFFFFF' : '#000000',
    },
    style
  ];
  
  return (
    <Text 
      style={accessibleStyle} 
      {...props}
      accessible={true}
      accessibilityRole="text"
    >
      {children}
    </Text>
  );
};

export default AccessibleText;
