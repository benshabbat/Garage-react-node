import { ModalForm } from "..";
import { useUsersContext } from "../../pages/users/UsersContext";

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
      inputs={[
        {
          name: "username",
          type: "text",
          errorExist: "Username is exist",
          isExist: isExistUser,
        },
        {
          name: "email",
          type: "email",
          errorExist: "Email is exist",
          isExist: isExistEmail,
        },
        {
          name: "phone",
          type: "tel",
          errorExist: "Phone is exist",
          isExist: isExistPhone,
        },
        {
          name: "password",
          type: "password",
          min: 8,
        },
      ]}
    />
  );
};

export default Register;
