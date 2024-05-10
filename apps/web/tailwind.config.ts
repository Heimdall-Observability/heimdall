import { Config } from 'tailwindcss'

const tailwindConfig = {
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './../../packages/ui/src/**/*.{ts,tsx}',
    './node_modules/@openstatus/react/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        emphasis: 'hsl(var(--primary))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      lineHeight: {
        DEFAULT: '24px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0px' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0px' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '24ch' },
        },
        blink: {
          from: { 'border-right-color': 'transparent' },
          to: { 'border-right-color': 'black' },
        },
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': '0% center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': '100% center',
          },
        },
        border: {
          '0%, 100%': {
            transform: 'translateX(0)',
          },
          '50%': {
            transform: 'translateX(50px)',
          },
          '70%': {
            transform: 'translateX(100px)',
          },
          '80%': {
            transform: 'translateX(400px)',
          },
          '100%': {
            transform: 'translateX(600px)',
          },
        },

        'background-pan': {
          from: {
            'background-position': '0% center',
          },
          to: {
            'background-position': '-200% center',
          },
        },
        'spin-slow': {
          from: {
            'transform-origin': 'center center',
            transform: 'rotate(0deg)',
          },
          to: {
            'transform-origin': 'center center',
            transform: 'rotate(360deg)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        typing: 'typing 2s steps(14), blink 0.1s infinite',
        text: 'text 6s linear infinite',
        border: 'border 30s ease infinite -2s',
        'background-pan': 'background-pan 3s linear infinite',
        'spin-slow': 'spin-slow 10s linear infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('@tailwindcss/container-queries'),
  ],
} satisfies Config

export default tailwindConfig
