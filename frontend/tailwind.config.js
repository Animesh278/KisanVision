/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                botanical: {
                    50: '#F3F7F4',
                    100: '#E4EDE6',
                    200: '#CADACD',
                    300: '#A4BFAB',
                    400: '#759D80',
                    500: '#4D7D5B',
                    600: '#346343',
                    700: '#274E34',
                    800: '#1D3B27',
                    900: '#13281B',
                    950: '#0B1710',
                    ink: '#08140E',
                    leaf: '#1E683F',
                },
                paper: {
                    50: '#FBF9F4',
                    100: '#F4EFE6',
                    200: '#E7E0D2',
                    300: '#D9CFC0',
                    400: '#C2B49F',
                    500: '#9B8C77',
                    800: '#2B251D',
                    900: '#17130E',
                },
                rust: {
                    50: '#FDF6F0',
                    100: '#FAECE0',
                    200: '#F4D4BD',
                    500: '#D66524',
                    600: '#B84E13',
                    700: '#93390B',
                    800: '#732B09',
                },
                forest: {
                    50: '#F2F7F4',
                    100: '#E2EFE7',
                    200: '#C5DFD0',
                    300: '#9ECAAF',
                    400: '#6FAE88',
                    500: '#3D8C5E',
                    600: '#287047',
                    700: '#1E5838',
                    800: '#16432B',
                    900: '#0F2E22',
                    950: '#071A12',
                },
                sage: {
                    50: '#F8FAF7',
                    100: '#EFF5EE',
                    200: '#DFEAE0',
                    300: '#C7D9C8',
                    400: '#A8C2A9',
                }
            },
            fontFamily: {
                editorial: ['Newsreader', 'Georgia', 'serif'],
                serif: ['Newsreader', 'Georgia', 'serif'],
                sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
                heading: ['Newsreader', 'Georgia', 'serif'],
                mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
            }
        },
    },
    plugins: [],
}
