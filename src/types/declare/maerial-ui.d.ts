import '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    assist: {
      blue: string;
      laghtBlue: string;
      yellow: string;
      green: string;
      orange: string;
    };
  }
}
