import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React, { FC } from 'react';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF5000',
      contrastText: '#fff',
    },
    assist: {
      blue: '#002FFF',
      laghtBlue: '#00AEFF',
      yellow: '#FFCB2E',
      green: '#00D1AB',
      orange: '#FF4744',
    },
    text: {
      primary: '#111111',
      secondary: '#5F6065',
    },
    error: {
      main: '#FFE6E6',
    },
    success: {
      main: '#DCFAF4',
    },
    warning: {
      main: '#FFF9E6',
    },
    info: {
      main: '#E6F7FF',
    },
    background: {
      default: '#F4F4F6',
    },
  },
});
interface IFThemeProviderProps {}
const FThemeProvider: FC<IFThemeProviderProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default FThemeProvider;
