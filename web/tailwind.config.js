module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
    daisyui: {
        themes: [
            {
                phone: {
                    "base-100": "#27272a"
                }
            }
        ]
    },
	theme: {
		extend: {
            colors: {
                'whatsapp-teal': "#128C7E",
                'whatsapp-teal-dark': "#075E54",
                'whatsapp-light-green': "#25D366",
                'whatsapp-blue': "#34B7F1"
            },
			width: {
				phone: '500px',
			},
			height: {
				phone: '1000px',
			},
		},
	},
	plugins: [require('daisyui')],
};
