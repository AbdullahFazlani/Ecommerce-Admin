module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "theme-grey-cloud": "#b5b5c3",
        "theme-bluish-purple": "#7239EA",
        "theme-gun-powder": "#3f4254",
        "theme-steel": "#7e8299",
        "theme-grey-chateau": "#a1a5b7",
        "theme-border-line": "#D9E1E7",
        "theme-font-disabled": "#A4A4A4",
        "theme-line": "#D9E1E7",
        "theme-primary-bg": "#F3F6F9",
        "theme-font": "#3C3C3C",
        "theme-font-body": "#03041D",
        "theme-font-text-field": "#666666",
        "theme-main-bg": "#F1F4FA",
        "theme-reject-red": "#B82626",
        "theme-accepted-green": "#008042",
        "theme-icon-color": "#809FB8",
        "theme-icon-square": "#2866A9",
        "theme-red-light-ghost": "#E699A3",
        "theme-red-ghost": "#C00016",
        "theme-online": "#1BA141",
        "theme-minimize": "#FAFAFA",
        "theme-main-red": "#C00016",
        "theme-background-form": "#F3F6F9",
        "theme-menu-button":
          "linear-gradient(134.47deg, #FFFFFF -26.79%, #D0BEC0 230.75%)",
        "theme-main": "#5e17eb",
        // ==== from dermiss web app - for buttons etc will remove extra while cleaning the themes
        "theme-main-blue": "#0071EB",
        "theme-gray": "#3C3C3C",
        "theme-text-error": "#D65858",
        "theme-second-font": "#757575",
        "theme-info-title": "#797979",
        "theme-attribute-info": "#9E9E9E",
        "theme-attribute-value": "#575757",
        "theme-secon-bg": "#E8F0FE",
        "theme-notification-orange": "#FFF0D1",
        "theme-error": "#F5D5D5",
        "theme-warning": "#F5D5D5",
        "theme-success": "#5CC161",
        // ==== from dermiss web app
      },
      backgroundImage: {
        "hero-pattern": "url('/img/hero-pattern.svg')",
        "footer-texture": "url('/img/footer-texture.png')",
        "theme-menu-button":
          "linear-gradient(134.47deg, #FFFFFF -26.79%, #D0BEC0 230.75%)",
      },
    },
  },
  variants: {
    extend: {
      // backgroundColor: ["checked"],
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require("tailwind-scrollbar-hide")],
};
