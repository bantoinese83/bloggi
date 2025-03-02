import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms'; //For form styling
import aspectRatio from '@tailwindcss/aspect-ratio';// For aspect ratio utilities
import containerQueries from '@tailwindcss/container-queries';//For container queries

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}', // Add app folder as well
    ],
    darkMode: 'class', // Enable dark mode (class-based or 'media' for system preference)
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var, sans-serif', { fontFeatureSettings: '"cv11", "ss01"' }], //Inter font optimization
            },
            colors: {
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#b9d9fa',
                    300: '#7ac5f5',
                    400: '#38a3ef',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                },
            },
            keyframes: { //Example keyframe animations
                shimmer: {
                    '100%': {
                        transform: 'translateX(100%)',
                    },
                },
            },
            animation: {
                shimmer: 'shimmer 1.5s infinite linear',
            },
        },
    },
    plugins: [
        typography,
        forms,
        aspectRatio,
        containerQueries,
        require('@tailwindcss/line-clamp'), //Truncate long texts
    ],
    future: {
        hoverOnlyWhenSupported: true, //Reduces specificity issues with hover effects on touch devices
    },
};
export default config;