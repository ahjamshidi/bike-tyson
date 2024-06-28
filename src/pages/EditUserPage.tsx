
import { useEffect } from "react";
import EditUserForm from "../components/editUserForm/editUserForm";

export function EditUserPage ({
  pageTitleHandler,
}: {
  pageTitleHandler: React.Dispatch<React.SetStateAction<string>>;
}) {
  useEffect(() => {
    pageTitleHandler('EditUserPage');
  }, []);
  return (
    <div>
      Edit User
      <EditUserForm />
    </div>
  );
}