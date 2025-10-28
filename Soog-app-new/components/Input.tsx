import React from 'react';
import { View, TextInput, Text } from 'react-native';

interface InputProps {
  label?: string;
  placeholder?: string;
 value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  multiline?: boolean;
  numberOfLines?: number;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
 error,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
}) => {
  return (
    <View className="w-full mb-4">
      {label && <Text className="text-base font-semibold mb-2 text-gray-70">{label}</Text>}
      <TextInput
        className={`border border-gray-300 rounded-lg py-3 px-3 text-base bg-white ${error ? 'border-red-500' : ''} ${multiline ? 'h-24 text-left align-top' : ''}`}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};

export default Input;