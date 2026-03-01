import { ModalForm } from "..";
import { useUsersContext } from "../../pages/users/UsersContext";
import { buildUserFormInputs } from "../../pages/users/utils/userValidation";

const Register = () => {
  const { modals, useRegister } = useUsersContext();
  const { setFormData, onSubmit, isExistEmail, isExistPhone, isExistUser } = useRegister();

  return (
    <ModalForm
      isOpen={modals.createUser.isOpen}
      onClose={modals.createUser.handle}
      onSubmit={onSubmit}
      setFormData={setFormData}
      title="Create User"
      inputs={buildUserFormInputs({ isExistEmail, isExistPhone, isExistUser })}
    />
  );
};

export default Register;
