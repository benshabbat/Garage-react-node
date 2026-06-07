import { ModalForm } from "..";
import { useUsersUIStore } from "../../stores/uiStores";
import { useUserHandlers } from "../../pages/users/hooks/useUserHandlers";
import { buildUserFormInputs } from "../../pages/users/utils/userValidation";

const Register = () => {
  const createUserOpen = useUsersUIStore((s) => s.createUserOpen);
  const toggleCreateUser = useUsersUIStore((s) => s.toggleCreateUser);
  const { useRegister } = useUserHandlers();
  const { setFormData, onSubmit, isExistEmail, isExistPhone, isExistUser, registerError } =
    useRegister();

  return (
    <ModalForm
      isOpen={createUserOpen}
      onClose={toggleCreateUser}
      onSubmit={onSubmit}
      setFormData={setFormData}
      title="Create User"
      inputs={buildUserFormInputs({ isExistEmail, isExistPhone, isExistUser })}
      serverError={registerError}
    />
  );
};

export default Register;
