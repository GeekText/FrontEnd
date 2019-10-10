import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import home from "./home/home";
import Cart from "./components/Cart/Cart";
import Registration from "./components/Registration(Profile Mgmt)/Registration"

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={home} />
            <Route path="/cart" component={Cart} />
            {/* TODO PAUL HAS TO ADD HIS COMPONENT */}
            <Route path="/profile" component={Registration} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
