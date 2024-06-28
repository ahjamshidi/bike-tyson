import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { HomePage } from '@/pages/HomePage';
import AppBottomNavigation from '@/components/appBottomNavigation/AppBottomNavigation';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import { AddBikePage } from './pages/AddBikePage';
import { MyBikesPage } from './pages/MyBikesPage';
import { UserReportsPage } from './pages/UserReportsPage.tsx';
import { AppBar, Box, Container, IconButton, Toolbar } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import RegisterPage from './pages/RegisterPage';
import { EditUserPage } from './pages/EditUserPage';
import {UserReportsDetailPage} from "@/pages/UserReportsDetailPage.tsx";
import { EditBikePage } from './pages/EditBikePage';
import { AddStolenBikeReport } from './pages/AddStolenBikeReport';
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
    <>q
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
            <AppBar position="fixed">
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={handleBackBut}
                >
                  <ArrowBackIosNewRoundedIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Container maxWidth="sm" sx={{ padding: 0 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/AddBikePage" element={<AddBikePage />} />
                <Route path="/MyBikesPage" element={<MyBikesPage />} />
                <Route path="/UserReportsPage" element={<UserReportsPage />} />
                 <Route path="/details/:id" element={<UserReportsDetailPage />} />
                <Route path="/editUser" element={<EditUserPage />} />
                <Route path="/EditBikePage/:id" element={<EditBikePage />} />
                <Route
                  path="/stolenBikeReport"
                  element={<AddStolenBikeReport />}
                />
              </Routes>
            </Container>
            <AppBottomNavigation />
          </>
        )}
        {!isVisited && (
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        )}
      </Box>
    </>
  );
};

export default App;
