import { useFormInput, useFormCheckbox } from './Auth';
import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

function Login() {
  const history = useNavigate();
  const [errorMsg, setErrorMsg] = React.useState("");
  const mail = useFormInput('');
  const pass = useFormInput('');
  const cookieCheckbox = useFormCheckbox();
  const { setToken, setUseCookie, setAuth } = useAuth();

  let htmlErrorMsg = <></>;
  if (errorMsg.length != 0) {
    htmlErrorMsg = <><span>{errorMsg}</span><br/><br/></>
  }

  const execLogin = () => {
    let data = {
      "mail": mail.value,
      "pass": pass.value
    };

    axios.post("http://localhost:3002/user/login", data).then((response) => {
      if(response.data.status != 200) {
        setErrorMsg(response.data.data.error_details);
        throw response.data.data.error_details;
      }

      setUseCookie(cookieCheckbox);
      setToken(response.data.data.sessionId);
      setAuth(true);
      history("/home");
    }).catch((err) => console.log(err));
  }

  return (
    <div id="blog-post-list">
      <h1>Login</h1><br/>
      <form onSubmit={e => e.preventDefault()}>
        <label htmlFor="email">E-mail:</label><br/>
        <input {...mail} type="text" id="email" name="email" placeholder="name@example.com"/><br/>
        <label htmlFor="pass">Password:</label><br/>
        <input {...pass} type="password" id="pass" name="pass"/><br/><br/>
        <input {...cookieCheckbox} type="checkbox" id="cookie" name="cookie" value="true"/>
        <label htmlFor="cookie"> Stay connected!</label><br/><br/>
        {htmlErrorMsg}
        <button type="button" onClick={execLogin}>Submit</button>
      </form>
    </div>
  )
}

export default Login;
