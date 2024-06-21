import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { HomePage } from '@/pages/HomePage';
import AppBottomNavigation from '@/components/appBottomNavigation/AppBottomNavigation';
import { themeOptions } from './constances/theme';

function App() {
  const defaultTheme = createTheme(themeOptions);

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <AppBottomNavigation></AppBottomNavigation>
      </ThemeProvider>
    </>
  );
}

export default App;
