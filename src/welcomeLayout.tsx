
import { Outlet } from 'react-router-dom';
import './App.css';
import { Container } from '@mui/material';

export function WelcomeLayout() {
 
  return (
    <>
      <Container maxWidth="sm" sx={{ padding: 0 ,position:'relative'}}>
        <Outlet />
      </Container>
    </>
  );
}
