import { useEffect } from 'react';
import EditUserForm from '../components/editUserForm/editUserForm';
import { useLocation } from 'react-router-dom';
import { CONFIG } from '@/constances/config';

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
    <div>
      Edit User
      <EditUserForm user={user} />
    </div>
  );
}
