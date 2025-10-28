import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  fullWidth = false,
}) => {
  // Determine button classes based on props
  const getButtonClasses = () => {
    let baseClasses = 'py-3 px-5 rounded-lg items-center justify-center ';
    
    if (fullWidth) {
      baseClasses += 'w-full ';
    }
    
    if (disabled || loading) {
      return baseClasses + 'bg-gray-400 ';
    }
    
    switch (variant) {
      case 'secondary':
        return baseClasses + 'bg-gray-500 ';
      case 'danger':
        return baseClasses + 'bg-red-500 ';
      default:
        return baseClasses + 'bg-blue-500 ';
    }
  };

  const getTextClasses = () => {
    let baseClasses = 'text-base font-semibold ';
    
    if (disabled || loading) {
      return baseClasses + 'text-gray-400 ';
    }
    
    switch (variant) {
      case 'secondary':
      case 'danger':
      default:
        return baseClasses + 'text-white ';
    }
  };

  return (
    <TouchableOpacity
      className={getButtonClasses()}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text className={getTextClasses()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;