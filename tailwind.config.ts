
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				myanmar: {
					blue: 'hsl(var(--myanmar-blue))', /* Gold */
					orange: 'hsl(var(--myanmar-orange))', /* Gold */
					'blue-light': 'hsl(var(--myanmar-blue-light))', /* Light Gold */
					'orange-light': 'hsl(var(--myanmar-orange-light))', /* Light Gold */
					'blue-dark': 'hsl(var(--myanmar-blue-dark))', /* Dark Gold */
					gray: 'hsl(var(--myanmar-gray))',
					'gray-light': 'hsl(var(--myanmar-gray-light))',
					red: 'hsl(var(--myanmar-red))' /* Gold */
				},
				gold: {
					50: '#fffef7',
					100: '#fffacd',
					200: '#fff68f',
					300: '#ffed4e',
					400: '#ffd700', /* Pure gold */
					500: '#daa520', /* Dark goldenrod */
					600: '#b8860b', /* Dark gold */
					700: '#9a7209',
					800: '#7c5902',
					900: '#654902'
				}
			},
			fontFamily: {
				'myanmar': ['Noto Sans Myanmar', 'Pyidaungsu', 'sans-serif'],
				'inter': ['Inter', 'system-ui', 'sans-serif']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-8px)' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(218, 165, 32, 0.5)' },
					'50%': { boxShadow: '0 0 30px rgba(218, 165, 32, 0.8)' }
				},
				'typewriter': {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(0.95)' },
					'100%': { transform: 'scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'typewriter': 'typewriter 0.1s ease-in-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
