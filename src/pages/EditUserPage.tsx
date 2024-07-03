import { useEffect } from 'react';
import EditUserForm from '../components/editUserForm/editUserForm';
import { useLocation } from 'react-router-dom';
import { CONFIG } from '@/constances/config';
import { Box } from '@mui/material';

export function EditUserPage({
  pageTitleHandler,
}: {
  pageTitleHandler: React.Dispatch<React.SetStateAction<string>>;
}) {
  const location = useLocation();
  const user = location.state.user;
  useEffect(() => {
    pageTitleHandler(CONFIG.PageRoute.editUser.title);
  }, []);
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '500px',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 120px)',
        padding: '0 20px',
        boxSizing: 'border-box',
        mt: 8,
        pb: 7,
      }}
    >
      <EditUserForm user={user} />
    </Box>
  );
}
