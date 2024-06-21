import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import { HomePage } from '@/pages/HomePage';

function App() {
  const defaultTheme = createTheme();

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </ThemeProvider>
    </>
  )
}

export default App
