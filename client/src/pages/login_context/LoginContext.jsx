import React, { useContext,useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const {loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async e=>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try{
        const res = await axios.post("/auth/login",credentials)
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
        navigate("/")
    }catch(err)
    {
        dispatch({type:"LOGIN_FAIL",payload:err.response.data})
    }
  }
  
  return (
    <div className="login">
      <div className="login-container">
        <input
          className="login-input"
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
        />
        <input
          className="login-input"
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
        />
        <button disabled={loading} className="login-button" onClick={handleClick}>Login </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
