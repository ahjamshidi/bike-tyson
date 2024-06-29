import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { HomePage } from '@/pages/HomePage';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import { AddBikePage } from './pages/AddBikePage';
import { MyBikesPage } from './pages/MyBikesPage';
import UserReportPage from './pages/UserReportPage';
import { Box } from '@mui/material';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword.tsx';
import ResetCode from './pages/ResetCode';
import UpdatePassword from './pages/UpdatePassword';
import { EditUserPage } from './pages/EditUserPage';
import UserReportDetailPage from '@/pages/UserReportDetailPage.tsx';
import { EditBikePage } from './pages/EditBikePage';
import { AddStolenBikeReport } from './pages/AddStolenBikeReport';
import ProfilePage from './pages/ProfilePage.tsx';
import { MainLayout } from './mainLayout.tsx';
import { WelcomeLayout } from './welcomeLayout.tsx';
import { CONFIG } from './constances/config.ts';

const App: React.FC = () => {
  const [pageTitle, setPageTitle] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const routeNames = CONFIG.PageRoute;
  useEffect(() => {
    const visited = localStorage.getItem('isVisited') === 'true';
    if (visited && location.pathname === '/welcome') {
      navigate('/', { replace: true });
    }
    if (
      !visited &&
      location.pathname !== '/login' &&
      location.pathname !== '/register' &&
      location.pathname !== '/forgot-password' &&
      location.pathname !== '/reset-code' &&
      location.pathname !== '/update-password'
    ) {
      navigate('/welcome', { replace: true });
    }
  }, [navigate]);

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
        <>
          <Routes>
            <Route element={<MainLayout pageTitle={pageTitle} />}>
              <Route path={routeNames.HomePage.path} element={<HomePage />} />
              <Route
                path={routeNames.AddBikePage.path}
                element={<AddBikePage pageTitleHandler={setPageTitle} />}
              />
              <Route
                path={routeNames.MyBikesPage.path}
                element={<MyBikesPage pageTitleHandler={setPageTitle} />}
              />
              <Route
                path={routeNames.UserReportsPage.path}
                element={<UserReportPage pageTitleHandler={setPageTitle} />}
              />
              <Route
                path={routeNames.UserReportPage.path}
                element={
                  <UserReportDetailPage pageTitleHandler={setPageTitle} />
                }
              />
              <Route
                path={routeNames.editUser.path}
                element={<EditUserPage pageTitleHandler={setPageTitle} />}
              />
              <Route
                path={routeNames.profile.path}
                element={<ProfilePage pageTitleHandler={setPageTitle} />}
              />
              <Route
                path={routeNames.EditBikePage.path}
                element={<EditBikePage pageTitleHandler={setPageTitle} />}
              />
              <Route
                path={routeNames.stolenBikeReport.path}
                element={
                  <AddStolenBikeReport pageTitleHandler={setPageTitle} />
                }
              />
            </Route>

            <Route element={<WelcomeLayout />}>
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-code" element={<ResetCode />} />
              <Route path="/update-password" element={<UpdatePassword />} />
            </Route>
          </Routes>
        </>
      </Box>
    </>
  );
};

export default App;
