/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var, sans-serif', { fontFeatureSettings: '"cv11", "ss01"' }],
                serif: ['Merriweather, serif'],// add serif family
                mono: ['ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'], // monospace font
            },
            colors: {
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bdd7fe',
                    300: '#9ec5fe',
                    400: '#7fb2fe',
                    500: '#5e92fc',
                    600: '#4176f3',
                    700: '#315aca',
                    800: '#274394',
                    900: '#21357a',
                },
                // Add more custom colors as needed
            },
        },
    },
    plugins: [],
}