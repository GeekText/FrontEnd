import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  render() {
    return (
      <div className="container">
        <div class="form-header">
          <h4 class="title">Welcome to the Account Login Page</h4>
        </div>
        Enter your existing login credentials in the fields below to proceed to
        proceed: <br /> <br />
        <form>
          Login ID: <input type="text" id="LoginID" required /> <br />
          Password: <input type="text" id="Password" required /> <br />
          <input className="submit-button" type="submit" value="Submit"></input>
        </form>
        <Link to="/profile">
          <span href="#create" className="account-link" type="button">
            Don't have an account? Click here to create one.
          </span>
        </Link>
      </div>
    );
  }
}
export default Login;
