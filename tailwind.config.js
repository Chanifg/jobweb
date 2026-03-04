/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    yellow: '#ffd900',
                    grey: '#f3f4f6',
                    darkgrey: '#4b5563',
                    text: '#1f2937'
                },
                primary: '#ec5b13',
                'sun-yellow': '#FFD700',
                'soft-grey': '#F3F4F6',
                'professional-grey': '#64748b',
                'background-light': '#f8f6f6',
                'background-dark': '#221610',
            },
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'sans-serif'],
                display: ['Public Sans', 'sans-serif'],
            },
            borderRadius: {
                'custom': '8px',
            }
        },
    },
    plugins: [],
}
