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
                heading: ['Lora, serif'],
                body: ['Open Sans, sans-serif'],
                code: ['Fira Code, monospace'],
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
                secondary: '#f6993f',
                textPrimary: '#222222',
                textSecondary: '#718096',
                bgPrimary: '#f9f9f9',
                bgSecondary: '#ffffff',
                accent: '#e2e8f0',
            },
            spacing: {
                xs: '4px',
                sm: '8px',
                md: '16px',
                lg: '24px',
                xl: '32px',
            },
            borderRadius: {
                sm: '4px',
                md: '8px',
                lg: '16px',
            },
            boxShadow: {
                sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
                md: '0 4px 6px rgba(0, 0, 0, 0.1)',
                lg: '0 10px 15px rgba(0, 0, 0, 0.15)',
            },
            fontSize: {
                body: '16px',
                h1: '36px',
                h2: '30px',
                h3: '24px',
                h4: '20px',
                h5: '18px',
                h6: '16px',
            },
            lineHeight: {
                body: '1.6',
            },
            letterSpacing: {
                heading: '0.02em',
            },
            maxWidth: {
                container: '1200px',
            },
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
            },
            zIndex: {
                dropdown: 1000,
                modal: 1050,
                tooltip: 1100,
            },
            transitionDuration: {
                fast: '200ms',
                medium: '500ms',
                slow: '1000ms',
            },
            transitionTimingFunction: {
                default: 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
            width: {
                narrow: '600px',
                regular: '800px',
                wide: '1000px',
            },
        },
    },
    plugins: [],
}
