import { Form, OpenModal } from "..";
import { useHeaderUIStore } from "../../stores/uiStores";
import { useHeaderHandlers } from "../header/hooks/useHeaderHandlers";
const Login = () => {
  const isOpenLogin = useHeaderUIStore((s) => s.loginOpen);
  const { useLogin, handleLogin } = useHeaderHandlers();
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
              // errorMessage: "Your username or password is wrong",
              // isError,
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
