module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            width: {
                'phone': '500px'
            },
            height: {
                'phone': '1000px'
            }
        },
    },
    plugins: [require("daisyui")],
}
