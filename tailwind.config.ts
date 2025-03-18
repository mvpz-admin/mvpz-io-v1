import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./core/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor : {
        secondary : "var(--background-secondary)" ,
        
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary : "var(--primary)",
        ternary : "var(--ternary)" 
       
      },
      borderColor : {
        bordersecondary  : "var(--background-secondary)",
        secondary  : "var(--background-secondary)"
      },
      fontFamily : {
        graffiti : "var(--font-family-graffiti)",
        monumentRegular : "var(--font-family-monumentRegular)",
        monumentUltraBold : "var(--font-family-monumentUltraBold)",
        inter : "var(--font-family-inter)",
        impact : "var(--font-family-impact)",
        nato : "var(--font-family-nato)"
      
      },
      transform: ['group-hover'], 
      animation: {
        "spin-slow": "spin 50s linear infinite", // Slower spin (default is 1s)
      },
    },
  },
  plugins: [
   
  ],
};
export default config;
