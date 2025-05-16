import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      primaryLight: string;
      primaryTransparent: string;

      text: {
        primary: string;
        secondary: string;
        inverted: string;
      };

      background: {
        default: string;
        alt: string;
      };

      border: string;

      feedback: {
        success: string;
        error: string;
        warning: string;
        info: string;
      };

      disabled: string;

      button: {
        primary: string;
        primaryHover: string;
        primaryActive: string;
        secondary: string;
        secondaryHover: string;
        secondaryActive: string;
      };
    };

    fonts: {
      primary: string;
    };
    breakpoints: {
      xs: "480px";
      sm: "576px";
      md: "768px";
      lg: "992px";
      xl: "1200px";
      xxl: "1400px";
      xxxl: "1920px";
      uw: "2560px";
    };
  }
}
