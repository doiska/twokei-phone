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
