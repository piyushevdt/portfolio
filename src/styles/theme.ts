import { createTheme } from '@mui/material/styles';
import { Shadows_Into_Light } from 'next/font/google';

export const shadowsIntoLight = Shadows_Into_Light({
  weight: '400',
  subsets: ['latin'],
});

export const theme = createTheme({
  palette: {
    primary: {
      main: '#39fcfcff',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
      fontFamily: shadowsIntoLight.style.fontFamily,
      h1: {
        fontSize: '3.5rem',
        fontWeight: 700,
      },
      h2: {
        fontSize: '2.8rem',
        fontWeight: 600,
      },
      h3: {
        fontSize: '2.2rem',
        fontWeight: 600,
      },
      h4: {
        fontSize: '1.8rem',
      },
      h5: {
        fontSize: '1.5rem',
      },
      h6: {
        fontSize: '1.2rem',
      },
    },
   components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 249, 241, 1)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 249, 241, 1)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 249, 241, 1)",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "rgba(0, 249, 241, 0.7)", // default label
          "&.Mui-focused": {
            color: "rgba(0, 249, 241, 1)", // focused label
          },
        },
      },
    },
  },
});