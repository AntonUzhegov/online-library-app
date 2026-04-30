// Основные цвета приложения
export const COLORS = {
  // Основные цвета библиотеки
  primary: '#0f5c3e',    
  primaryDark: '#0a3b2a',   
  primaryLight: '#1a7a52',  
  primaryGradient: 'linear-gradient(135deg, #0a3b2a 0%, #1a6b4a 100%)',
  
  accent: '#ffd966',      
  accentDark: '#ffb347',    
  accentLight: '#ffe08c',   
  
  // Статусы
  success: '#27ae60',
  successBg: '#e8f5e9',
  danger: '#c0392b',
  dangerBg: '#fee2e2',
  warning: '#e65100',
  warningBg: '#fff3e0',
  
  // Фоны
  background: '#f5f5f5',
  backgroundLight: '#fafafa',
  cardBg: '#ffffff',
  
  // Текст
  textPrimary: '#1a1a1a',
  textSecondary: '#666666',
  textLight: '#888888',
  textWhite: '#ffffff',
  
  // Границы
  border: '#e5e7eb',
  borderLight: '#f0f0f0',
}

// Тени
export const SHADOWS = {
  small: '0 2px 8px rgba(0,0,0,0.05)',
  medium: '0 4px 12px rgba(0,0,0,0.08)',
  large: '0 8px 20px rgba(0,0,0,0.1)',
  xlarge: '0 20px 40px rgba(0,0,0,0.1)',
  
  primary: '0 4px 14px rgba(15,92,62,0.3)',
  primaryHover: '0 8px 20px rgba(15,92,62,0.4)',
  accent: '0 8px 20px rgba(255,217,102,0.2)',
}

// Скругления
export const BORDER_RADIUS = {
  small: '12px',
  medium: '16px',
  large: '20px',
  xlarge: '24px',
  pill: '30px',
  round: '50%',
}

// Отступы
export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '24px',
  xxxl: '32px',
  huge: '40px',
}

// Анимации
export const TRANSITIONS = {
  fast: 'all 0.2s ease',
  normal: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'all 0.5s ease',
}

// Шрифты
export const FONTS = {
  family: "'Poppins', 'Segoe UI', Arial, sans-serif",
  familyAlt: "'Inter', 'Poppins', 'Segoe UI', Arial, sans-serif",
  
  size: {
    xs: '11px',
    sm: '12px',
    md: '13px',
    base: '14px',
    lg: '15px',
    xl: '16px',
    xxl: '18px',
    huge: '20px',
    giant: '24px',
    massive: '32px',
  },
  
  weight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
}