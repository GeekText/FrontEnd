import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import "./style.css";
class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Password: "",
      cc_number: ""
    };
    this.updatePassword = this.updatePassword.bind(this);
    this.updateCC = this.updateCC.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  check_entries(input, cc_num) {
    /* var loginid = document.getElementByID("LoginID");
    var pw = document.getElementByID("Password");
    var cfrmpw = document.getElementByID("ConfirmPassword");
    var name = document.getElementByID("Name");
    var nickname = document.getElementByID("Nickname");
    var email = document.myForm.email.value // document.getElementByID("email");
    var addrLine1 = document.getElementByID("AddressLine1");
    var city = document.getElementByID("City");!cc_num.value.match(desired_ccnum)
    var state = document.getElementByID("State");!input.value.match(desired_pswd)
    var zip = document.getElementByID("ZIPCode"); */
    var desired_pswd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!desired_pswd.test(input.value)) {
      alert("Password does not meet criteria! Try again.");
      return false;
    }
    var desired_ccnum = /^(?=.*[0-9])/;
    if (!desired_ccnum.test(cc_num.value)) {
      alert("Invalid credit card number. Should only contain numbers!");
      return false;
    }

    // insert form validation here
  }
  updatePassword(event) {
    this.setState({ Password: event.target.value });
  }
  updateCC(event) {
    this.setState({ cc_number: event.target.value });
  }
  handleSubmit() {
    console.log("PW: %s \nCC: %s", this.state.Password, this.state.cc_number);
    this.check_entries(this.state.Password, this.state.cc_number);
  }

  render() {
    return (
      <div className="base-container">
        <form name="form">
          Welcome to the Account Creation page. Here, you will create your
          account. <br />
          <Link to="/login">
            <span href="#login" className="account-link">
              Already have an account? Click here to login.
            </span>
          </Link>{" "}
          Enter the following to proceed: <br /> <br />
          <div class="form-header">
            <h4 class="title">Login Credentials</h4>
          </div>
          Login ID: <input type="text" id="LoginID" required /> <br />
          Password:{" "}
          <input
            type="text"
            onChange={this.updatePassword}
            id="Password"
            required
          />{" "}
          <br />
          (Password must be 6-20 characters, and contain at least one lowercase
          letter, uppercase letter, and a number 0-9)
          <br />
          <div class="form-header">
            <h4 class="title">Personal Information</h4>
          </div>
          Name: <input type="text" id="Name" required /> <br />
          Nickname (for commenting and rating):{" "}
          <input type="text" id="Nickname" required /> <br />
          E-mail Address: <input type="text" id="email" required /> <br />
          <div class="form-header">
            <h4 class="title">Shipping/Home Address</h4>
            (You will be able to add more addresses once your account has been
            created) <br />
          </div>
          Unit Number and Street:{" "}
          <input type="text" id="AddressLine1" required /> <br />
          City: <input type="text" id="City" required /> <br />
          State (2 letter-abbreviation):{" "}
          <input type="text" id="State" required /> <br />
          ZIP Code: <input type="text" id="ZIPCode" required /> <br /> <br />
          <div class="form-header">
            <h4 class="title">Credit Card Detail</h4>
            (You will be able to add more credit cards once your account has
            been created) <br />
          </div>
          Card # (no spaces or dashes):{" "}
          <input
            type="text"
            onChange={this.updateCC}
            id="cc_number"
            required
          />{" "}
          <br />
          Exp Date (MM/YYYY):
          <div class="date-field">
            <div class="month">
              Month{" "}
              <select name="Month">
                <option value="january">01</option>
                <option value="february">02</option>
                <option value="march">03</option>
                <option value="april">04</option>
                <option value="may">05</option>
                <option value="june">06</option>
                <option value="july">07</option>
                <option value="august">08</option>
                <option value="september">09</option>
                <option value="october">10</option>
                <option value="november">11</option>
                <option value="december">12</option>
              </select>
            </div>
            <div class="year">
              Year{" "}
              <select name="Year">
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
          </div>
          CVV: <input type="text" id="cc_cvv" required /> <br /> <br />
          <input
            className="submit-button"
            type="submit"
            value="Submit"
            onClick={this.handleSubmit}
          />
        </form>
      </div>
    );
  }
}

export default Registration;
