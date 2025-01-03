import { Form, OpenModal } from "../index";
import { useUsersContext } from "../../pages/users/UsersContext";

const EditUser = () => {
  const { useEditCar,modals } = useUsersContext();
  const {onSubmitEditUser,formData,setFormData}=useEditCar()

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
              value: formData?.username,
            },
            {
              name: "email",
              type: "email",
              value: formData?.email,
            },
            {
              name: "phone",
              value: formData?.phone,
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
