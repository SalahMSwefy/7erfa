/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                brand: 'Bruno Ace SC, sans-serif',
            },
            colors: {
                main: {
                    50: '#fffcea',
                    100: '#fff5c5',
                    200: '#ffeb85',
                    300: '#ffda46',
                    400: '#ffc71b',
                    500: '#ffa500',
                    600: '#e27c00',
                    700: '#bb5502',
                    800: '#984208',
                    900: '#7c360b',
                    950: '#481a00',
                    transparent: '#fffceab3',
                },
            },
            animation: {
                'focus-in-expand': 'focus-in-expand 3s ease-out infinite both',
            },
            keyframes: {
                'focus-in-expand': {
                    '0%': {
                        letterSpacing: '-0.5em',
                        filter: 'blur(12px)',
                        opacity: '0',
                    },
                    '100%': {
                        filter: 'blur(0)',
                        opacity: '1',
                    },
                },
            },
        },
    },
    plugins: [],
}
