import { Form, OpenModel } from "..";
import { useUsersContext } from "../../pages/users/UsersContext";
import { useRegister } from "./utilsCreate";

const Register = ({ handelClick, isOpen }) => {
  const {users} = useUsersContext()
  const {setFormData,onSubmit,isValidUser} =useRegister(users,handelClick)
  return (
    <OpenModel
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
          handelClick={handelClick}
          onSubmit={onSubmit}
        />
      }
      isOpen={isOpen}
    />
  );
};

export default Register;
