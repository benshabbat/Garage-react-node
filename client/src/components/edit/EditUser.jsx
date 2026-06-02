import { ModalForm } from "../index";
import { useUsersUIStore } from "../../stores/uiStores";
import { useUserHandlers } from "../../pages/users/hooks/useUserHandlers";
import { buildUserFormInputs } from "../../pages/users/utils/userValidation";

const EditUser = () => {
  const editUserOpen = useUsersUIStore((s) => s.editUserOpen);
  const toggleEditUser = useUsersUIStore((s) => s.toggleEditUser);
  const { useEditUser } = useUserHandlers();
  const { onSubmitEditUser, formData, setFormData, isExistEmail, isExistPhone, isExistUser } = useEditUser();

  return (
    <ModalForm
      isOpen={editUserOpen}
      onClose={toggleEditUser}
      onSubmit={onSubmitEditUser}
      setFormData={setFormData}
      formData={formData}
      title="Edit User"
      inputs={buildUserFormInputs({ isExistEmail, isExistPhone, isExistUser }, formData)}
    />
  );
};

export default EditUser;
