// src/App.jsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import ProfileForm from './components/ProfileForm';
import theme from './theme/muiTheme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProfileForm />
    </ThemeProvider>
  );
}

export default App;