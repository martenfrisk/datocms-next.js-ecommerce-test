/* eslint-disable quote-props */
module.exports = {
  future: {
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    // mode: 'all',
    content: [
      './pages/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
    ],
  },
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(-3deg)' },
          '60%': { transform: 'rotate(3deg)' },
          '90%': { transform: 'rotate(-1deg)' },
        },
        smallbounce: {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'none',
          },
          '50%': {
            transform: 'translateY(-5%)',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 2s ease-in-out 1s 5',
        smallbounce: 'smallbounce 1s ease-in-out 1s 10',
        float: 'float 10s ease 0s infinite',
      },
      opacity: {
        '80': '0.8',
        '90': '0.9',
        '95': '0.95',
      },
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        blueish: {
          100: '#d2d9ec',
          200: '#a5b3d9',
          300: '#788ec5',
          400: '#4b68b2',
          500: '#1e429f',
          600: '#18357f',
          700: '#12285f',
          800: '#0c1a40',
          900: '#060d20',
        },
      },
      spacing: {
        28: '7rem',
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
        '3xl': '0 1px 1px rgba(0,0,0,0.11), 0 2px 2px rgba(0,0,0,0.11), 0 4px 4px rgba(0,0,0,0.11), 0 8px 8px rgba(0,0,0,0.11), 0 16px 16px rgba(0,0,0,0.11), 0 32px 32px rgba(0,0,0,0.11);',
        '4xl': '0 1px 1px rgba(0,0,0,0.16), 0 2px 2px rgba(0,0,0,0.16), 0 4px 4px rgba(0,0,0,0.16), 0 8px 8px rgba(0,0,0,0.16), 0 16px 16px rgba(0,0,0,0.16), 0 32px 32px rgba(0,0,0,0.16);',
      },
    },
  },
}
