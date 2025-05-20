const theme = {
  colors: {
    primary: "#0467B8",
    primaryDark: "#034f91",
    primaryLight: "#4A90E2",
    primaryTransparent: "rgba(4, 103, 184, 0.1)",

    button: {
      primary: "#0467B8",
      primaryHover: "#035FA1",
      primaryActive: "#034F91",
      secondary: "#F1F1F1",
      secondaryHover: "#E0E0E0",
      secondaryActive: "#D0D0D0",
    },

    text: {
      primary: "#141819",
      secondary: "#4F4F4F",
      inverted: "#FFFFFF",
    },

    background: {
      default: "#FFFFFF",
      alt: "#F7F9FB",
    },

    border: "#DCE3EB",

    feedback: {
      success: "#2ECC71",
      error: "#E74C3C",
      warning: "#F1C40F",
      info: "#3498DB",
      errorBackground: "#fce8e8",
    },

    disabled: "#A0C3E8",
  },

  fonts: {
    primary: "'Roboto', sans-serif",
  },

  breakpoints: {
    xs: "480px", // celulares pequenos
    sm: "576px", // celulares maiores
    md: "768px", // tablets
    lg: "992px", // laptops
    xl: "1200px", // desktops médios
    xxl: "1400px", // telas grandes
    xxxl: "1920px", // Full HD
    uw: "2560px", // ultra-wide , etc
  },
};

export default theme;
