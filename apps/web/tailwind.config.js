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
		},
	},
	plugins: [require('daisyui')],
};
