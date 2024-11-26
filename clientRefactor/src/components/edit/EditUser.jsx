import { Form, OpenModel } from "../index";
import { useUsersContext } from "../../pages/users/UsersContext";

//todo:try move logic to context
const EditUser = ({ handelClick, isOpen }) => {
  const { useEditCar } = useUsersContext();
  const {onSubmitEditUser,formData,setFormData}=useEditCar()


  return (
    <OpenModel
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
          handelClick={handelClick}
          onSubmit={onSubmitEditUser}
        />
      }
      isOpen={isOpen}
    />
  );
};

export default EditUser;
