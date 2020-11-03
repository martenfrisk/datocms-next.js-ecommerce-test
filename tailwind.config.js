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
      },
      spacing: {
        28: '7rem',
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
        '3xl': "0 1px 1px rgba(0,0,0,0.11), 0 2px 2px rgba(0,0,0,0.11), 0 4px 4px rgba(0,0,0,0.11), 0 8px 8px rgba(0,0,0,0.11), 0 16px 16px rgba(0,0,0,0.11), 0 32px 32px rgba(0,0,0,0.11);",
        '4xl': "0 1px 1px rgba(0,0,0,0.16), 0 2px 2px rgba(0,0,0,0.16), 0 4px 4px rgba(0,0,0,0.16), 0 8px 8px rgba(0,0,0,0.16), 0 16px 16px rgba(0,0,0,0.16), 0 32px 32px rgba(0,0,0,0.16);"
      },
    },
  },
}
