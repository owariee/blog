function Register() {
  return (
    <div id="blog-post-list">
      <h1>Register</h1>
      <form action="/register.php" method="post">
      <label htmlFor="email">E-mail:</label><br/>
      <input type="text" id="email" name="email" placeholder="name@example.com"/><br/>
      <label htmlFor="pass">Password:</label><br/>
      <input type="password" id="pass" name="pass"/><br/>
      <label htmlFor="pass-confirm">Confirm Password:</label><br/>
      <input type="password" id="pass-confirm" name="pass-confirm"/><br/>
      <input type="submit" value="Submit"/>
      </form>
    </div>
  )
}

export default Register;
