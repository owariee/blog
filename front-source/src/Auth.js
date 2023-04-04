import axios from "axios";
import * as React from "react";

export function isLogged(cookies) {
  let token = sessionStorage.getItem("authorization");
  if (token === null) {
    if (cookies.authorization != undefined) {
      token = cookies.authorization;
    }
  }

  let config = {
    headers: {
      authorization: token,
    }
  };

  return axios.get("http://localhost:3002/user/info", config)
    .then((response) => response.data)
    .catch((err) => console.log(err));
}


export const useFormInput = initialValue => {
  const [value, setValue] = React.useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export const useFormCheckbox = () => {
  const [value, setValue] = React.useState(false);
 
  const handleChange = e => {
    setValue(!value);
  }
  return {
    value,
    onChange: handleChange
  }
}
