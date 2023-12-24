import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { Form, OpenModel } from "..";
import { useSelector } from "react-redux";
const Login = ({ handelClick, isOpen }) => {
  const { isError, message } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState();
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(login(formData));
  };
  useEffect(() => {
    console.log(isError);
  }, [isError, message]);
  return (
    <OpenModel
      comp={
        <Form
          setData={setFormData}
          title="Login"
          sec_title="enter your name & password"
          inputs={[
            {
              name: "username",
              type: "text",
              errorMessage: "Your username or password is wrong",
              isError,
            },
            {
              name: "password",
              type: "password",
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

export default Login;
