import { Form, OpenModel } from "..";
import { useHeaderContext } from "../header/HeaderContext";
const Login = () => {
  const { handleLogin, isOpenLogin, useLogin, isError } = useHeaderContext();
  const { setFormData, onSubmit } = useLogin();
  return (
    <OpenModel
      comp={
        <Form
          setData={setFormData}
          title="Login"
          inputs={[
            {
              name: "username",
              type: "text",
              errormessage: "Your username or password is wrong",
              isError
            },
            {
              name: "password",
              type: "password",
            },
          ]}
          handelClick={handleLogin}
          onSubmit={onSubmit}
        />
      }
      isOpen={isOpenLogin}
    />
  );
};

export default Login;
