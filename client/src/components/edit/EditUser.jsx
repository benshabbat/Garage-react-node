import { Form, OpenModal } from "../index";
import { useUsersContext } from "../../pages/users/UsersContext";

const EditUser = () => {
  const { useEditUser,modals } = useUsersContext();
  const {onSubmitEditUser,formData,setFormData,isExistEmail, isExistPhone, isExistUser}=useEditUser()

  return (
    <OpenModal
      comp={
        <Form
          setData={setFormData}
          title="Edit User"
          sec_title="enter your name & password"
          inputs={[
            {
              name: "username",
              type: "text",
              value: formData?.username,
              isExist: isExistUser,
              errorExist: "Username is exist",
            },
            {
              name: "email",
              type: "email",
              errorExist: "Email is exist",
              isExist: isExistEmail,
              value: formData?.email,
            },
            {
              name: "phone",
              type: "tel",
              value: formData?.phone,
              errorExist: "Phone is exist",
              isExist: isExistPhone
            },
            {
              name: "password",
              type: "password",
              min: 8,
              value: formData?.password,
            },
          ]}
          handleClick={modals.editUser.handle}
          onSubmit={onSubmitEditUser}
        />
      }
      isOpen={modals.editUser.isOpen}
    />
  );
};

export default EditUser;
