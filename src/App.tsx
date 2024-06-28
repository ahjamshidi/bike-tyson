import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { HomePage } from '@/pages/HomePage';
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
import { MainLayout } from './mainLayout.tsx';
import { WelcomeLayout } from './welcomeLayout.tsx';

const App: React.FC = () => {
  // const [isVisited, setIsVisited] = useState<boolean>(false);
  const [pageTitle, setPageTitle] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const visited = localStorage.getItem('isVisited') === 'true';
    if (visited && location.pathname === '/welcome') {
      navigate('/', { replace: true });
    }
    // setIsVisited(visited);
    if (
      !visited &&
      location.pathname !== '/login' &&
      location.pathname !== '/register'
    ) {
      navigate('/welcome', { replace: true });
    }
  }, [navigate]);

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
        <>
          <Routes>
            <Route element={<MainLayout pageTitle={pageTitle} />}>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/AddBikePage"
                element={<AddBikePage pageTitleHandler={setPageTitle} />}
              />
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
            </Route>

            <Route element={<WelcomeLayout />}>
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          </Routes>
        </>
      </Box>
    </>
  );
};

export default App;
