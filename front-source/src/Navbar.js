import { Link } from "react-router-dom";
import { useAuth } from './AuthProvider';

function Navbar() {
  const { user, setAuth } = useAuth();

  let navItems;
  if(user === null) {
    navItems = <>
      <li><Link style={{float: 'right'}} to="/register">Register</Link></li>
      <li><Link style={{float: 'right', marginRight: 10}} to="/login">Login</Link></li>
    </>;
  } else {
    let bonusItems;
    if(user.permission > 1) {
      bonusItems = <>
          <li><Link style={{float: 'right', marginRight: 10}} to="/posts/add">New Post</Link></li>
        </>;
    }
    navItems = <>
      <li><a style={{float: 'right'}}>Welcome {user.mail}!</a></li>
      <li><Link style={{float: 'right', marginRight: 10}} to="/logout">Logout</Link></li>
      {bonusItems}
    </>;
  }

  return (
  <div>
    <div id="blog-header">
      <h1>João Gabriel Sabatini</h1>
      <form className="form-inline" action="/search.php" method="post">
        <input type="search" placeholder="Search" aria-label="Search" id="term" name="term"/>
        <button type="submit">Search</button>
      </form>
    </div>
    <div id="navbar">
      <ul>
      <li><Link to="/home" relative="path">Home</Link></li>
      <li><Link to="/posts">Posts</Link></li>
      <li><Link to="https://git.sabatini.xyz/owari">Git</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      {navItems}
      </ul>
    </div>
  </div>
  );
}

export default Navbar;

