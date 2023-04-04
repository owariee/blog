import { useFormInput, useFormCheckbox } from './Auth';
import React from "react";
import axios from "axios";
import { redirect } from "react-router-dom";

function Login() {
  const [errorMsg, setErrorMsg] = React.useState("");
  const mail = useFormInput('');
  const pass = useFormInput('');
  const useCookie = useFormCheckbox();


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
        return;
      }

      if(useCookie.value) {
        // store token in cookies
      } else {
        sessionStorage.setItem('authorization', response.data.data.sessionId);
      }

      return redirect('/home')
      console.log(response.data);
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
        <input {...useCookie} type="checkbox" id="cookie" name="cookie" value="true"/>
        <label htmlFor="cookie"> Stay connected!</label><br/><br/>
        {htmlErrorMsg}
        <button type="button" onClick={execLogin}>Submit</button>
      </form>
    </div>
  )
}

export default Login;
