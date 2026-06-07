import { Form, OpenModal } from "..";
import { useHeaderUIStore } from "../../stores/uiStores";
import { useHeaderHandlers } from "../header/hooks/useHeaderHandlers";
import { useAuthStore } from "../../stores/authStore";
const Login = () => {
  const isOpenLogin = useHeaderUIStore((s) => s.loginOpen);
  const isLoading = useAuthStore((s) => s.isLoading);
  const { loginForm, handleLogin } = useHeaderHandlers();
  const { setFormData, onSubmit } = loginForm;
  return (
    <OpenModal
      comp={
        <Form
          setData={setFormData}
          title="Login"
          inputs={[
            { name: "username", type: "text" },
            { name: "password", type: "password" },
          ]}
          handleClick={handleLogin}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      }
      isOpen={isOpenLogin}
    />
  );
};

export default Login;
