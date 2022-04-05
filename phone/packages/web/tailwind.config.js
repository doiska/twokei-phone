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
                'whatsapp-blue': "#34B7F1",
                'whatsapp-chat-light-green': "#dcf8c6",
                'whatsapp-chat-rose': "#ECE5DD"
            },
			width: {
				phone: '500px',
                'phone-body': '100%'
			},
			height: {
				phone: '1000px',
                'phone-body': '91%'
			},
            maxWidth: {
                'phone-body': '100%'
            },
            maxHeight: {
                'phone-body': '91%'
            }
		},
	},
	plugins: [require('daisyui')],
};
