import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AccessibilityPreferences {
  fontSize: number;
  highContrast: boolean;
  useVoiceInput: boolean;
  useVoiceOutput: boolean;
  hapticFeedback: boolean;
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
}

interface UserPreferencesContextType {
  preferences: AccessibilityPreferences;
  updatePreferences: (newPrefs: Partial<AccessibilityPreferences>) => void;
}

const defaultPreferences: AccessibilityPreferences = {
  fontSize: 16,
  highContrast: false,
  useVoiceInput: false,
  useVoiceOutput: false,
  hapticFeedback: false,
  colorBlindMode: 'none',
};

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export const UserPreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(defaultPreferences);

  const updatePreferences = (newPrefs: Partial<AccessibilityPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPrefs }));
  };

  return (
    <UserPreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
};