import { Form, OpenModal } from "..";
import { useHeaderContext } from "../header/HeaderContext";
const Login = () => {
  const { handleLogin, isOpenLogin, useLogin, isError } = useHeaderContext();
  const { setFormData, onSubmit } = useLogin();
  console.log("Login Modal Open:", isOpenLogin); // בדיקה
  return (
    <OpenModal
      comp={
        <Form
          setData={setFormData}
          title="Login"
          inputs={[
            {
              name: "username",
              type: "text",
              errormessage: "Your username or password is wrong",
              isError,
            },
            {
              name: "password",
              type: "password",
            },
          ]}
          handleClick={handleLogin}
          onSubmit={onSubmit}
        />
      }
      isOpen={isOpenLogin}
    />
  );
};

export default Login;
