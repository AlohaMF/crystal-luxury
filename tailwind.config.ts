import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                onyx: {
                    50: "#71717a",
                    100: "#52525b",
                    200: "#3f3f46",
                    800: "#27272a",
                    900: "#18181b",
                    950: "#09090b", // Deepest black
                    DEFAULT: "#09090b",
                },
                charcoal: {
                    DEFAULT: "#18181b", // Card background
                },
                gold: {
                    DEFAULT: "#D4AF37", // Classic metallic gold
                    light: "#E5C86B",
                    dark: "#A3862C",
                },
                marble: {
                    50: "#fafafa",
                    100: "#f4f4f5",
                    200: "#e4e4e7", // Text base
                    DEFAULT: "#e4e4e7",
                },
                // Keep legacy for backward compat during migration if needed, or map them
                cream: {
                    DEFAULT: "#e4e4e7", // Mapping to marble for safety
                    50: "#fafafa",
                    100: "#f4f4f5",
                    200: "#e4e4e7",
                },
                navy: {
                    DEFAULT: "#09090b", // Mapping to onyx for safety
                    800: "#18181b",
                    900: "#09090b",
                }
            },
            letterSpacing: {
                widest: '.2rem', // Luxurious spacing
                eagle: '.3rem',
            },
            fontFamily: {
                serif: ["var(--font-playfair)", "serif"],
                sans: ["var(--font-inter)", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
