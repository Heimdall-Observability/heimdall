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
        border: 'hsl(var(--border) / <alpha-value>) !important',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        alternative: 'hsl(var(--alternative) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary)/ <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        brand: {
          DEFAULT: 'hsl(var(--brand)/ <alpha-value>)',
          foreground: 'hsl(var(--brand-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        normal: {
          DEFAULT: 'hsl(var(--normal) / <alpha-value>)',
          foreground: 'hsl(var(--normal-foreground) / <alpha-value>)',
        },
        info: {
          DEFAULT: 'hsl(var(--info) / <alpha-value>)',
          foreground: 'hsl(var(--info-foreground) / <alpha-value>)',
        },
        warn: {
          DEFAULT: 'hsl(var(--warn) / <alpha-value>)',
          foreground: 'hsl(var(--warn-foreground) / <alpha-value>)',
        },
        success: {
          DEFAULT: 'hsl(var(--success) / <alpha-value>)',
          foreground: 'hsl(var(--success-foreground) / <alpha-value>)',
        },
        error: {
          DEFAULT: 'hsl(var(--error) / <alpha-value>)',
          foreground: 'hsl(var(--error-foreground) / <alpha-value>)',
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
