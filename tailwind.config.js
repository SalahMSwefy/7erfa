/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                brand: 'Bruno Ace SC, sans-serif ',
            },
            colors: {
                'brand-main': '#FF5733', // Example for the main brand color
                'brand-light': '#FFC300', // Example for the light brand color
                'brand-transparent': 'rgba(255, 87, 51, 0.5)', // Example transparent brand color (adjust as needed)
            },
        },
    },
    plugins: [],
}
