import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const { user, setAuth } = useAuth();
  const history = useNavigate();

  const logout = () => {
    if(user !== null) {
      setAuth(false);
    }

    history('/home');
  }

  setTimeout(logout, 5000);

  return (
    <>
      <div className="blog-content" style={{overflow: 'auto'}}>
        <h2 style={{marginBottom: 10}}>Logging you out!</h2>
      </div>
    </>
  );
}

export default Logout;

