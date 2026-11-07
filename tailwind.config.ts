import { fontFamily } from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "work-sans": ["var(--font-work-sans)", ...fontFamily.sans],
        mulish: ["var(--font-mulish)", ...fontFamily.sans],
        "open-sans": ["var(--font-open-sans)", ...fontFamily.sans],
        inter: ["var(--font-inter)", ...fontFamily.sans],
        "public-sans": ["var(--font-public-sans)", ...fontFamily.sans],
        roboto: ["var(--font-roboto)", ...fontFamily.sans],
        sans: ["Helvetica Neue", ...fontFamily.sans],
      },
      colors: {
        primary: {
          50: "#58585b",
          100: "#49494d",
          200: "#3a3a3e",
          300: "#2b2b2e",
          400: "#1d1d20",
          500: "#212025",
          600: "#19191c",
          700: "#121215",
          800: "#0c0c0f",
          900: "#050507",
        },
        neutral: {
          bg: "#F5F5F5",
          default: "#1F1F1F",
          divider: "#EBEBEB",
          outline: "#D9D9D9",
          secondary: "#707070",
          tertiary: "#999CA0",
          text: "#FFFFFF",
        },
        fail: {
          50: "#fbeaea",
          100: "#f1bfbf",
          200: "#eba0a0",
          300: "#e27474",
          400: "#dc5959",
          500: "#d33030",
          600: "#c02c2c",
          700: "#962222",
          800: "#741a1a",
          900: "#591414",
        },
      },
      boxShadow: {
        primary: "0px 5px 20px rgba(82, 87, 104, 0.15)",
      },
      fontSize: {
        xxxs: "8px",
        xxs: "10px",
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "30px",
        "4xl": "36px",
        "5xl": "48px",
        "6xl": "60px",
        "7xl": "72px",
        "8xl": "96px",
        "9xl": "128px",
      },
    },
    screens: {
      xs: "360px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },

  plugins: [tailwindcssAnimate],
};
export default config;
