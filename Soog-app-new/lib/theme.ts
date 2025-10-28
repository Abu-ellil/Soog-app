// Define theme constants for the app
export const theme = {
  colors: {
    primary: '#007bff',
    primaryDark: '#0056b3',
    secondary: '#6c757d',
    secondaryDark: '#545b62',
    success: '#28a745',
    info: '#17a2b8',
    warning: '#ffc107',
    danger: '#dc3545',
    light: '#f8f9fa',
    dark: '#343a40',
    white: '#ffffff',
    black: '#000000',
    gray: '#6c757d',
    lightGray: '#f5f5f5',
    border: '#ddd',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-bold',
    h4: 'text-xl font-bold',
    body: 'text-base',
    caption: 'text-sm',
  },
 borderRadius: {
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
  },
  sizes: {
    button: {
      sm: 'py-2 px-3',
      md: 'py-3 px-5',
      lg: 'py-4 px-6',
    },
  },
};

// Export individual color constants for easy import
export const {
  primary,
  primaryDark,
  secondary,
  secondaryDark,
  success,
  info,
  warning,
  danger,
  light,
  dark,
  white,
  black,
  gray,
  lightGray,
  border,
} = theme.colors;

// Export spacing constants
export const { xs, sm, md, lg, xl } = theme.spacing;

// Export typography classes
export const { h1, h2, h3, h4, body, caption } = theme.typography;

// Export border radius classes
export const { sm: borderRadiusSm, md: borderRadiusMd, lg: borderRadiusLg, xl: borderRadiusXl } = theme.borderRadius;

// Export size classes
export const { button } = theme.sizes;