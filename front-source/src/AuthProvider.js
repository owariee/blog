import { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const AuthContext = createContext({
  user: null,
  setAuth: () => {},
  setToken: () => {},
  setUseCookie: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [useCookie, setUseCookie] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['authorization']);

  const clearBrowser = () => {
    setUser(null);
    localStorage.removeItem('authorization');
    removeCookie('authorization',{path:'/'});
  }

  useEffect(() => {
    let tmpToken = token;
    if(tmpToken === null) {
      tmpToken = sessionStorage.getItem("authorization");
      if(tmpToken === null) {
        tmpToken = cookies.authorization
      } 
      if (tmpToken === undefined) {
        setUser(null);
        return;
      }
    } else {
      if(useCookie) {
        let expires = new Date();
        expires.setTime(expires.getTime() + 2592000); // 1 month
        setCookie('authorization', token, {path: '/',  expires, secure: true, sameSite: 'none'});
      } else {
        sessionStorage.setItem('authorization', token);
      }
    }

    let config = {
      headers: {
        authorization: tmpToken,
      }
    };

    if(auth == false) {
      axios.post("http://localhost:3002/user/logout", config)
        .then((response) => {
          clearBrowser();
        }).catch((err) => {
          console.log(err);
        });
      return;
    }

    axios.get("http://localhost:3002/user/info", config)
      .then((response) => {
        if(response.data.status !== 200) {
          throw response.data.data.error_details;
        }
        setUser(response.data.data);
      }).catch((err) => { 
        console.log(err);
        clearBrowser();
      });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, setAuth, setToken, setUseCookie }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

