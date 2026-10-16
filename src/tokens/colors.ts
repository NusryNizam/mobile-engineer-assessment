const LightPalette = {
  Neutral0: "#FFFFFF",
  Neutral50: "#F5F7FA",
  Neutral100: "#EBEEF3",
  Neutral200: "#DCE1E8",
  Neutral400: "#9AA6B5",
  Neutral600: "#5B6B80",
  Neutral900: "#10151D",

  Navy900: "#0A1F3D",
  Navy700: "#123262",
  Navy500: "#1E4D8C",
  Navy100: "#E1E9F5",

  Green600: "#1E8E53",
  Green100: "#E3F7EC",
  Red600: "#D23C3C",
  Red100: "#FBE8E8",
  Amber600: "#B8822E",
};

const DarkPalette = {
  Neutral0: "#0B0F15",
  Neutral50: "#12161D",
  Neutral100: "#1C212B",
  Neutral200: "#2A313D",
  Neutral400: "#7E8A9B",
  Neutral600: "#AEB8C4",
  Neutral900: "#F5F7FA",

  Navy900: "#06101F",
  Navy700: "#163058",
  Navy500: "#4C7BC0",
  Navy100: "#16233A",

  Green600: "#3BC37C",
  Green100: "#113A26",
  Red600: "#FF6B6B",
  Red100: "#3A1818",
  Amber600: "#E0A74E",
};

export const Colors = {
  light: {
    text: {
      default: LightPalette.Neutral900,
      inverse: LightPalette.Neutral0,
      muted: LightPalette.Neutral600,
      secondary: LightPalette.Navy700,
      accent: LightPalette.Navy500,
      danger: LightPalette.Red600,
    },
    background: {
      default: LightPalette.Neutral50,
      surface: LightPalette.Neutral0,
      subtle: LightPalette.Neutral100,
      accent: LightPalette.Navy700,
      secondary: LightPalette.Navy100,
    },
    border: {
      default: LightPalette.Neutral200,
      strong: LightPalette.Navy700,
      subtle: LightPalette.Neutral100,
      danger: LightPalette.Red600,
    },
    icon: {
      default: LightPalette.Navy700,
      inverse: LightPalette.Neutral0,
      muted: LightPalette.Neutral400,
      secondary: LightPalette.Navy500,
    },
    status: {
      success: LightPalette.Green600,
      successSubtle: LightPalette.Green100,
      danger: LightPalette.Red600,
      dangerSubtle: LightPalette.Red100,
      warning: LightPalette.Amber600,
    },
  },
  dark: {
    text: {
      default: DarkPalette.Neutral900,
      inverse: DarkPalette.Neutral0,
      muted: DarkPalette.Neutral600,
      secondary: DarkPalette.Navy500,
      accent: DarkPalette.Navy500,
      danger: DarkPalette.Red600,
    },
    background: {
      default: DarkPalette.Neutral0,
      surface: DarkPalette.Neutral50,
      subtle: DarkPalette.Neutral100,
      accent: DarkPalette.Navy500,
      secondary: DarkPalette.Navy100,
    },
    border: {
      default: DarkPalette.Neutral200,
      strong: DarkPalette.Navy500,
      subtle: DarkPalette.Neutral100,
      danger: DarkPalette.Red600,
    },
    icon: {
      default: DarkPalette.Navy500,
      inverse: DarkPalette.Neutral0,
      muted: DarkPalette.Neutral400,
      secondary: DarkPalette.Navy500,
    },
    status: {
      success: DarkPalette.Green600,
      successSubtle: DarkPalette.Green100,
      danger: DarkPalette.Red600,
      dangerSubtle: DarkPalette.Red100,
      warning: DarkPalette.Amber600,
    },
  },
};
