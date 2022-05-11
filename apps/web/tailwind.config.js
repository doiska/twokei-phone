module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	daisyui: {
		themes: [
			{
				phone: {
					'base-100': '#27272a',
				},
			},
		],
	},
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'whatsapp-teal': '#128C7E',
				'whatsapp-teal-dark': '#075E54',
				'whatsapp-light-green': '#25D366',
				'whatsapp-blue': '#34B7F1',
				'whatsapp-chat-light-green': '#dcf8c6',
				'whatsapp-chat-rose': '#ECE5DD',
				'steel-gray': {
					50: '#f6f5fa',
					100: '#eceaf4',
					200: '#d4d1e6',
					300: '#afa9d0',
					400: '#837bb5',
					500: '#635a9d',
					600: '#504782',
					700: '#423a6a',
					800: '#393359',
					900: '#1c1929',
				},
				'steel-slate': {
					50: '#62666b',
					100: '#585c61',
					200: '#4e5257',
					300: '#44484d',
					400: '#3a3e43',
					500: '#303439',
					600: '#262a2f',
					700: '#1c2025',
					800: '#12161b',
					900: '#080c11',
				},
				'shark': {
					DEFAULT: '#272e3a'
				},
				'twitter-blue': '#1DA1F2',
				'twitter-black': '#14171A',
				'twitter-dark-gray': '#657786',
				'twitter-light-gray': '#AAB8C2',
				'twitter-extra-light-gray': '#E1E8ED',
				'twitter-white': '#F5F8FA',
			},
			width: {
				phone: '500px',
				'phone-body': '100%',
			},
			height: {
				phone: '1000px',
				'phone-body': '91%',
			},
			maxWidth: {
				'phone-body': '100%',
			},
			maxHeight: {
				'phone-body': '91%',
			},
			boxShadow: {
				'3xl': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
				'4xl': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
				'5xl': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
				'6xl': '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
				'7xl': '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
			},
		},
	},
	plugins: [require('daisyui')],
};
