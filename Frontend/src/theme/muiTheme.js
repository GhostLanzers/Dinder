import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff3c68',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffa7c4',
      contrastText: '#000',
    },
    background: {
      default: '#ffbacf', // Light romantic pink background 💗
      paper: '#ffe1ea',   // Slight contrast for cards/forms
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', sans-serif",
    h4: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffa9c2',
          borderRadius: 20,
        },
      },
    },
  },
});

export default theme;