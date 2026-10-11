/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
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
                },
                earth: {
                    50: '#FBF9F7',
                    100: '#F4EFEB',
                    200: '#E8DED6',
                    300: '#D5C4B7',
                    800: '#4A3D34',
                    900: '#2E251E',
                }
            },
            fontFamily: {
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
                heading: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
