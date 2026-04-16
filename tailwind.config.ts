import { type Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // ✅ animation and keyframes must be INSIDE extend
      animation: {
        orbit: "orbit var(--duration) linear infinite",
        ripple:
          "ripple var(--duration, 2s) ease calc(var(--i, 0) * 0.2s) infinite",
      },
      keyframes: {
        orbit: {
          "0%": {
            transform:
              "rotate(var(--angle)) translateX(var(--radius)) rotate(calc(-1 * var(--angle)))",
          },
          "100%": {
            transform:
              "rotate(calc(var(--angle) + 360deg)) translateX(var(--radius)) rotate(calc(-1 * (var(--angle) + 360deg)))",
          },
        },
        ripple: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(1.15)",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-merge"),
    require("tailwindcss-animate"),
  ],
};

export default config;
