import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        bgImage: "url('../../public/assets/loginImage.svg')",
      },
      colors: {
        "primary-green": "#107137",
        "custom-black": "#3A3A3A",
        "custom-red": "#CE1818",
        background: "#FBFBFB",
        "light-green": "#BCD7C7",
      },
    },
  },
  plugins: [],
};
export default config;
