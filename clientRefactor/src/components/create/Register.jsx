import { Form, OpenModal } from "..";
import { useUsersContext } from "../../pages/users/UsersContext";
//to fix useRegister
const Register = () => {
  const {modals,useRegister} = useUsersContext()
  const {setFormData,onSubmit,isValidUser} =useRegister()
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
            },
            {
              name: "phone",
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
