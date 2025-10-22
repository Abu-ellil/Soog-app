import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

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
  const getButtonStyle = () => {
    const baseStyle = [styles.button, fullWidth && styles.fullWidth];
    
    if (disabled || loading) {
      return [...baseStyle, styles.disabledButton];
    }
    
    switch (variant) {
      case 'secondary':
        return [...baseStyle, styles.secondaryButton];
      case 'danger':
        return [...baseStyle, styles.dangerButton];
      default:
        return [...baseStyle, styles.primaryButton];
    }
 };

  const getTextStyle = () => {
    if (disabled || loading) {
      return styles.disabledText;
    }
    
    switch (variant) {
      case 'secondary':
        return styles.secondaryText;
      case 'danger':
        return styles.dangerText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
 primaryButton: {
    backgroundColor: '#007bff',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
  },
  dangerButton: {
    backgroundColor: '#dc3545',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  primaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dangerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;