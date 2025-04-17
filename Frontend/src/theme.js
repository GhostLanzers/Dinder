import { createTheme } from '@mui/material/styles';

const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#ff3c68', // Hot pink ❤️
//       contrastText: '#fff',
//     },
//     secondary: {
//       main: '#ffa7c4', // Light pink 💖
//       contrastText: '#000',
//     },
//     background: {
//       default: '#fff0f5', // Soft pinkish background
//       paper: '#ffffff',
//     },
//   },
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
  },
});

export default theme;