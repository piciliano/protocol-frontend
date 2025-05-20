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
        errorBackground: string;
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
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
      uw: string;
    };
  }
}
