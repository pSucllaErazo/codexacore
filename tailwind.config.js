/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./main.js"
  ],
  theme: {
    extend: {
      "colors": {
        "background": "#121414",
        "surface-container-highest": "#343535",
        "on-tertiary": "#2e3132",
        "secondary": "#c8c6c6",
        "on-primary-container": "#f2deff",
        "surface-variant": "#343535",
        "on-primary-fixed": "#2c0051",
        "inverse-surface": "#e3e2e2",
        "tertiary-container": "#646768",
        "on-secondary-fixed-variant": "#474747",
        "on-error": "#690005",
        "on-error-container": "#ffdad6",
        "primary": "#ddb7ff",
        "on-secondary": "#303030",
        "surface-bright": "#383939",
        "on-primary": "#490080",
        "surface-container-lowest": "#0d0e0f",
        "on-secondary-container": "#b6b5b4",
        "secondary-fixed": "#e4e2e1",
        "error-container": "#93000a",
        "on-tertiary-container": "#e4e6e7",
        "inverse-primary": "#8718e0",
        "surface-tint": "#ddb7ff",
        "outline-variant": "#4d4355",
        "secondary-fixed-dim": "#c8c6c6",
        "on-secondary-fixed": "#1b1c1c",
        "tertiary-fixed-dim": "#c5c7c8",
        "outline": "#998ca0",
        "on-tertiary-fixed": "#191c1d",
        "inverse-on-surface": "#2f3131",
        "on-background": "#e3e2e2",
        "surface-dim": "#121414",
        "on-surface": "#e3e2e2",
        "primary-fixed-dim": "#ddb7ff",
        "primary-fixed": "#f0dbff",
        "on-tertiary-fixed-variant": "#454748",
        "surface-container-high": "#292a2a",
        "surface-container-low": "#1a1c1c",
        "surface": "#121414",
        "error": "#ffb4ab",
        "primary-container": "#9028e9",
        "tertiary": "#c5c7c8",
        "surface-container": "#1e2020",
        "on-primary-fixed-variant": "#6900b3",
        "on-surface-variant": "#d0c2d7",
        "secondary-container": "#474747",
        "tertiary-fixed": "#e1e3e4"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "section-gap-mobile": "64px",
        "container-max": "1280px",
        "gutter": "24px",
        "section-gap-desktop": "120px",
        "base": "8px"
      },
      "fontFamily": {
        "body-lg": ["Inter"],
        "label-caps": ["Geist"],
        "headline-lg-mobile": ["Hanken Grotesk"],
        "headline-lg": ["Hanken Grotesk"],
        "headline-md": ["Hanken Grotesk"],
        "display": ["Hanken Grotesk"],
        "body-md": ["Inter"]
      },
      "fontSize": {
        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "label-caps": ["12px", { "lineHeight": "1.0", "letterSpacing": "0.1em", "fontWeight": "600" }],
        "headline-lg-mobile": ["32px", { "lineHeight": "1.2", "fontWeight": "600" }],
        "headline-lg": ["48px", { "lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "600" }],
        "headline-md": ["32px", { "lineHeight": "1.3", "fontWeight": "500" }],
        "display": ["64px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')],
}

