import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { HomePage } from '@/pages/HomePage';
import AppBottomNavigation from '@/components/appBottomNavigation/AppBottomNavigation';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import { AddBikePage } from './pages/AddBikePage';
import { MyBikesPage } from './pages/MyBikesPage';

import { UserReportPage } from './pages/UserReportPage.tsx';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import RegisterPage from './pages/RegisterPage';
import { EditUserPage } from './pages/EditUserPage';
import { UserReportDetailPage } from '@/pages/UserReportDetailPage.tsx';
import { EditBikePage } from './pages/EditBikePage';
import { AddStolenBikeReport } from './pages/AddStolenBikeReport';
import UserReportBikeFoundPage from '@/pages/UserReportBikeFoundPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import { CONFIG } from './constances/config.ts';
const App: React.FC = () => {
  const [isVisited, setIsVisited] = useState<boolean>(false);
  const [pageTitle, setPageTitle] = useState('');
  const [showBack, setShowBack] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!CONFIG.MainPages.includes(location.pathname)) {
      console.log(showBack);
      setShowBack(true);
    } else {
      setShowBack(false);
    }
    const visited = localStorage.getItem('isVisited') === 'true';
    setIsVisited(visited);
    if (
      !visited &&
      location.pathname !== '/login' &&
      location.pathname !== '/register'
    ) {
      navigate('/', { replace: true });
    }
  }, [location]);

  const handleBackBut = () => {
    navigate(-1);
  };

  return (
    <>
      q
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
                {showBack && (
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2, position: 'absolute' }}
                    onClick={handleBackBut}
                  >
                    <ArrowBackIosNewRoundedIcon />
                  </IconButton>
                )}
                <Typography
                  variant="h6"
                  component="h1"
                  sx={{ width: '100%', textAlign: 'center' }}
                >
                  {pageTitle}
                </Typography>
              </Toolbar>
            </AppBar>
            <Container maxWidth="sm" sx={{ padding: 0 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/UserReportPage" element={<UserReportPage />} />
                <Route
                  path="/UserReportPage/:id"
                  element={<UserReportDetailPage />}
                />
                <Route
                  path="/AddBikePage"
                  element={<AddBikePage pageTitleHandler={setPageTitle} />}
                />
                <Route path="/EditBikePage/:id" element={<EditBikePage />} />
                <Route
                  path="/MyBikesPage"
                  element={<MyBikesPage pageTitleHandler={setPageTitle} />}
                />
                <Route
                  path="/UserReportsPage"
                  element={<UserReportPage pageTitleHandler={setPageTitle} />}
                />
                <Route
                  path="/editUser"
                  element={<EditUserPage pageTitleHandler={setPageTitle} />}
                />
                <Route
                  path="/stolenBikeReport"
                  element={
                    <AddStolenBikeReport pageTitleHandler={setPageTitle} />
                  }
                />
                <Route path="/profile" element={<ProfilePage />} />
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
