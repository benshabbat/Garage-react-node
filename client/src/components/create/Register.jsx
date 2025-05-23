import { Form, OpenModal } from "..";
import { useUsersContext } from "../../pages/users/UsersContext";
const Register = () => {
  const {modals,useRegister} = useUsersContext()
  const {setFormData,onSubmit,isExistEmail, isExistPhone, isExistUser} =useRegister()
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
              errorExist: "Username is exist",
              isExist: isExistUser,
            },
            {
              name: "email",
              type: "email",
              errorExist: "Email is exist",
              isExist: isExistEmail
            },
            {
              name: "phone",
              errorExist: "Phone is exist",
              isExist: isExistPhone
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
