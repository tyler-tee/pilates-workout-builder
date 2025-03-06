// src/styles/AppStyles.js
// This file contains reusable style constants and utility classes

// Color palette
export const colors = {
    primary: '#3b82f6', // Blue
    primaryHover: '#2563eb',
    primaryLight: '#dbeafe',
    secondary: '#10b981', // Green
    secondaryHover: '#059669',
    secondaryLight: '#d1fae5',
    accent: '#8b5cf6', // Purple
    accentHover: '#7c3aed',
    accentLight: '#ede9fe',
    warning: '#f59e0b', // Amber
    warningHover: '#d97706',
    warningLight: '#fef3c7',
    error: '#ef4444', // Red
    errorHover: '#dc2626',
    errorLight: '#fee2e2',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    white: '#ffffff',
    black: '#000000',
  };
  
  // Screen breakpoints
  export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  };
  
  // Spacing scale
  export const spacing = {
    px: '1px',
    0: '0px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  };
  
  // Animation durations
  export const transitions = {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  };
  
  // Border radius
  export const borderRadius = {
    none: '0',
    sm: '0.125rem',
    default: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  };
  
  // Shadow styles
  export const shadows = {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
  };
  
  // Common button styles
  export const buttonStyles = {
    primary: `
      bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
      transition duration-300 ease-in-out
    `,
    secondary: `
      bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md
      focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50
      transition duration-300 ease-in-out
    `,
    success: `
      bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md
      focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
      transition duration-300 ease-in-out
    `,
    danger: `
      bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md
      focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
      transition duration-300 ease-in-out
    `,
    ghost: `
      bg-transparent hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-md
      focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50
      transition duration-300 ease-in-out
    `,
    link: `
      text-blue-600 hover:text-blue-800 underline font-medium
      focus:outline-none
      transition duration-300 ease-in-out
    `,
    icon: `
      p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700
      focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50
      transition duration-300 ease-in-out
    `,
  };
  
  // Card styles
  export const cardStyles = {
    default: `
      bg-white rounded-lg shadow-md overflow-hidden
    `,
    hover: `
      bg-white rounded-lg shadow-md overflow-hidden
      hover:shadow-lg transition-shadow duration-300
    `,
    bordered: `
      bg-white rounded-lg border border-gray-200 overflow-hidden
    `,
    flat: `
      bg-gray-50 rounded-lg overflow-hidden
    `,
  };
  
  // Form element styles
  export const formStyles = {
    input: `
      block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
      placeholder-gray-400
    `,
    checkbox: `
      h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded
      transition duration-300 ease-in-out
    `,
    radio: `
      h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300
      transition duration-300 ease-in-out
    `,
    select: `
      block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
      text-gray-700
    `,
    label: `
      block text-sm font-medium text-gray-700 mb-1
    `,
    error: `
      text-sm text-red-600 mt-1
    `,
    helpText: `
      text-sm text-gray-500 mt-1
    `,
  };
  
  // Typography styles
  export const typography = {
    h1: `text-4xl font-bold text-gray-900`,
    h2: `text-3xl font-bold text-gray-900`,
    h3: `text-2xl font-bold text-gray-900`,
    h4: `text-xl font-bold text-gray-900`,
    h5: `text-lg font-bold text-gray-900`,
    h6: `text-base font-bold text-gray-900`,
    paragraph: `text-base text-gray-700`,
    small: `text-sm text-gray-500`,
    link: `text-blue-600 hover:text-blue-800 hover:underline`,
  };
  
  // Utility functions
  export const utils = {
    // Convert hex color to rgba
    hexToRgba: (hex, alpha = 1) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },
    
    // Generate gradient background
    gradient: (startColor, endColor, direction = 'to right') => {
      return `bg-gradient-to-r from-${startColor} to-${endColor}`;
    },
  };