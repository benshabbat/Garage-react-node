import { ModalForm } from "../index";
import { useUsersContext } from "../../pages/users/UsersContext";
import { buildUserFormInputs } from "../../pages/users/utils/userValidation";

const EditUser = () => {
  const { useEditUser, modals } = useUsersContext();
  const { onSubmitEditUser, formData, setFormData, isExistEmail, isExistPhone, isExistUser } = useEditUser();

  return (
    <ModalForm
      isOpen={modals.editUser.isOpen}
      onClose={modals.editUser.handle}
      onSubmit={onSubmitEditUser}
      setFormData={setFormData}
      formData={formData}
      title="Edit User"
      inputs={buildUserFormInputs({ isExistEmail, isExistPhone, isExistUser }, formData)}
    />
  );
};

export default EditUser;
