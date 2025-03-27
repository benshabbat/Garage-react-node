import { Form, OpenModal } from "..";
import { useUsersContext } from "../../pages/users/UsersContext";
const Register = () => {
  const {modals,useRegister} = useUsersContext()
  const {setFormData,onSubmit,isValidUser,isValidEmail ,isValidPhone} =useRegister()
  return (
    <OpenModal
      comp={
        <Form
          setData={setFormData}
          title="Create User"
          sec_title=""
          inputs={[
            {
              name: "username",
              errorMessage: "Username is exist",
              isError: isValidUser,
            },
            {
              name: "email",
              type: "email",
              errorExist: "Email is exist",
              isExist: isValidEmail
            },
            {
              name: "phone",
              errorExist: "Phone is exist",
              isExist: isValidPhone
            },
            {
              name: "password",
              type: "password",
              min: 8,
            },
          ]}
          handleClick={modals.createUser.handle}
          onSubmit={onSubmit}
        />
      }
      isOpen={modals.createUser.isOpen}
    />
  );
};

export default Register;
