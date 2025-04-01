import { Form, OpenModal } from "..";
import { useHeaderContext } from "../header/HeaderContext";
const Login = () => {
  const { handleLogin, isOpenLogin, useLogin, isError,message } = useHeaderContext();
  const { setFormData, onSubmit } = useLogin();
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
              errormessage: message,
              // errormessage: "Your username or password is wrong",
              isError,
            },
            {
              name: "password",
              type: "password",
              errormessage: message,
              isError,
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
