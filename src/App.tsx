import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { HomePage } from '@/pages/HomePage';
import AppBottomNavigation from '@/components/appBottomNavigation/AppBottomNavigation';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import { AddBikePage } from './pages/AddBikePage';
import { MyBikesPage } from './pages/MyBikesPage';
import { AppBar, Box, Container, IconButton, Toolbar } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import RegisterPage from './pages/RegisterPage';

const App: React.FC = () => {
  const [isVisited, setIsVisited] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const visited = localStorage.getItem('isVisited') === 'true';
    setIsVisited(visited);
    if (
      !visited &&
      location.pathname !== '/login' &&
      location.pathname !== '/register'
    ) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleBackBut = () => {
    navigate(-1);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {isVisited && (
          <>
            <AppBar position='fixed'>
              <Toolbar>
                <IconButton
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  sx={{ mr: 2 }}
                  onClick={handleBackBut}
                >
                  <ArrowBackIosNewRoundedIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Container maxWidth='sm' sx={{ padding: 0 }}>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/AddBikePage' element={<AddBikePage />} />
                <Route path='/MyBikesPage' element={<MyBikesPage />} />
              </Routes>
            </Container>
            <AppBottomNavigation />
          </>
        )}
        {!isVisited && (
          <Routes>
            <Route path='/' element={<WelcomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        )}
      </Box>
    </>
  );
};

export default App;
