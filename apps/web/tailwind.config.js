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
					50: '#59606c',
					100: '#4f5662',
					200: '#454c58',
					300: '#3b424e',
					400: '#313844',
					500: '#272e3a',
					600: '#1d2430',
					700: '#131a26',
					800: '#09101c',
					900: '#000612',
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
