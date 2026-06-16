/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        accent: { DEFAULT: '#10b981', hover: '#059669', light: '#d1fae5', dim: '#065f46' },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-left': 'slideLeft 0.5s ease-out forwards',
        'slide-right': 'slideRight 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideLeft: { '0%': { opacity: '0', transform: 'translateX(30px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        slideRight: { '0%': { opacity: '0', transform: 'translateX(-30px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        typing: { '0%': { width: '0' }, '100%': { width: '100%' } },
        steam: { '0%, 100%': { opacity: '0.4', transform: 'translateY(0) scaleX(1)' }, '50%': { opacity: '0.9', transform: 'translateY(-10px) scaleX(1.4)' } },
        steamRise: {
          '0%': { opacity: '0', transform: 'translateY(0) translateX(0) scale(0.8)' },
          '20%': { opacity: '0.6' },
          '80%': { opacity: '0.3' },
          '100%': { opacity: '0', transform: 'translateY(-20px) translateX(3px) scale(1.2)' },
        },
        blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } },
        slideUpRotateIn: {
          '0%': { opacity: '0', transform: 'translateY(100%) rotateX(-90deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotateX(0deg)' },
        },
        slideUpRotateOut: {
          '0%': { opacity: '1', transform: 'translateY(0) rotateX(0deg)' },
          '100%': { opacity: '0', transform: 'translateY(-100%) rotateX(90deg)' },
        },
        codeDrift: {
          '0%': { opacity: '0', transform: 'translateY(0) translateX(0)' },
          '15%': { opacity: '0.7' },
          '85%': { opacity: '0.7' },
          '100%': { opacity: '0', transform: 'translateY(-40px) translateX(10px)' },
        },
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
