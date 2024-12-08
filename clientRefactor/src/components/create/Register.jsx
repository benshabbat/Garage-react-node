import { Form, OpenModal } from "..";
import { useUsersContext } from "../../pages/users/UsersContext";
import { useRegister } from "./utilsCreate";
//to fix useRegister
const Register = () => {
  const {users,modals} = useUsersContext()
  const {setFormData,onSubmit,isValidUser} =useRegister(users,modals.createUser.handle)
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
