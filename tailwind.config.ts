import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        sally: {
          primary: "#EC4863",
          secondary: "#d926a9",
          accent: "#1fb2a6",
          neutral: "#1B1737",
          "base-100": "#F4F4F4",
          info: "#3abff8",
          success: "#83BF6E",
          warning: "#F4C240",
          error: "#f87272",
        },
      },
    ],
  },
} satisfies Config;
