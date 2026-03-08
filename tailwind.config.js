/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                kanit: ['Kanit', 'sans-serif'],
                silkscreen: ['Silkscreen', 'cursive'],
                vt323: ['VT323', 'monospace'],
                pressStart: ['"Press Start 2P"', 'cursive'],
                pacifico: ['Pacifico', 'cursive'],
            },
        },
    },
    plugins: [],
}
