import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import './App.css';

import AppBottomNavigation from '@/components/appBottomNavigation/AppBottomNavigation';

import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { CONFIG } from './constances/config.ts';
export function MainLayout({ pageTitle }: { pageTitle: string }) {
  const [showBack, setShowBack] = useState(false);
  const [pagePath, setPagePath] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackBut = () => {
    navigate(-1);
  };
  useEffect(() => {
    setPagePath(location.pathname);
    if (!CONFIG.MainPages.includes(location.pathname)) {
      setShowBack(true);
    } else {
      setShowBack(false);
    }
  }, [location]);
  return (
    <>
      {pagePath != '/' && (
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
      )}
      <Container maxWidth="sm" sx={{ padding: 0 }}>
        <Outlet />
      </Container>
      <AppBottomNavigation />
    </>
  );
}
