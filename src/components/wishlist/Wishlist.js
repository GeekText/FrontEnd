import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  wishRemove,
  wishToCart,
  changeWishName,
  currentWishName
} from "./WishlistFunctions.js";
import "./Wishlist.css";
//import { start } from "repl";

class Wishlist extends Component {
  ///////////////////////////////////
  /////////////////////////////////
  //https://reactjs.org/docs/forms.html
  constructor(props) {
    super(props);
    this.state = {
      value: "wishlist",
      currentWishlist: {
        // current wishlist for the drop down
        id: 0, // id number for that wishlist
        items: [], // book items saved in wishlist
        options: [], // option array
        wishlistName: "Please choose a list" // name of the wishlist
      }
    };
    this.handleChange = this.handleChange.bind(this); // simplified function call for handleChange
    this.handleSubmit = this.handleSubmit.bind(this); // simplified function call for handleSubmit
    this.handleSave = this.handleSave.bind(this); // simplified function call for handleSave
  }
  // change "value" to value of the wishlist option
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // prevent refresh and change to wishlist of your choice.
  handleSubmit(event) {
    event.preventDefault();
    this.changeCurrentWishList();
  }

  // save list of your choice as current list.
  handleSave(event) {
    event.preventDefault();
    this.props.handleSave(this.state.currentWishlist);
  }

  // change current wishlist of the dropdown.
  changeCurrentWishList() {
    if (this.state.value === "wishlist") {
      this.setState({ currentWishlist: this.props.wishlist });
    } else if (this.state.value === "wishlist2") {
      this.setState({ currentWishlist: this.props.wishlist2 });
    } else {
      this.setState({ currentWishlist: this.props.wishlist3 });
    }
  }
  /////////////////////////////////////////////
  /////////////////////////////////////////////

  onChange(e) {
    // current array of options
    const options = this.props.wishlist.options;
    let index;

    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      options.push(+e.target.value);
      console.log(options);
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = options.indexOf(+e.target.value);
      options.splice(index, 1);
      console.log(options);
    }

    // update the state with the new array of options
    //this.setState({ options: options });
  }
  clickWishToCart = id => {
    this.props.clickWishToCart(id);
  };

  // When submit button is clicked, pass current wishlist name to the handler.
  mySubmitHandler = event => {
    event.preventDefault(); // prevent refleshing.
    this.props.mySubmitHandler(this.state.wishlistName);
  };

  // change the name of the current wishlist.
  myChangeHandler = event => {
    this.setState({ wishlistName: event.target.value });
  };

  clickRemove = id => {
    this.props.clickRemove(id);
  };

  clickAddToCart = number => {
    this.props.clickWishToCart(number);
    this.props.clickRemove(number);
  };

  render() {
    let currentlist = this.state.currentWishlist.items.length ? (
      this.state.currentWishlist.items.map(item => {
        return (
          <div
            style={{
              backgroundColor: "#f4f4f4",
              padding: "10px",
              borderBottom: "1px #ccc dotted"
            }}
            key={item.id}
          >
            <div className="input-group">
              <input
                type="checkbox"
                value={item.id}
                onChange={this.onChange.bind(this)}
              />{" "}
              <span htmlFor={item.id}>{item.book_name}</span>
            </div>
          </div>
        );
      })
    ) : (
      <div>
        <p>Your wishlist is empty.</p>
        <Link to="/#Items">
          <span href="#cart" className="links" type="button">
            Shop Here
          </span>
        </Link>
      </div>
    );

    return (
      <div className="container">
        <div className="#cart">
          <br></br>
          <h4>
            {this.state.currentWishlist.wishlistName} (
            {this.state.currentWishlist.items.length})
          </h4>
          <form onSubmit={this.mySubmitHandler} style={{ display: "flex" }}>
            <input
              type="text"
              name="wishlistName"
              style={{ flex: "10", padding: "5px" }}
              placeholder="Name your wishlist"
              onChange={this.myChangeHandler}
            />

            <input
              type="submit"
              value="submit"
              className="btn"
              style={{ flex: "1" }}
            />
          </form>

          <ul className="wishlist">{currentlist}</ul>
          <span
            className="wish-del-button"
            onClick={() => {
              this.props.wishlist.options.map(number =>
                this.props.clickRemove(number)
              );
            }}
          >
            Remove
          </span>

          <span
            className="add-button"
            onClick={() => {
              this.props.wishlist.options.map(number =>
                this.clickAddToCart(number)
              );
            }}
          >
            Add To Cart
          </span>

          {/*/////////////////////////////////////*/}
          {/*/////////////////////////////////////*/}
          <form onSubmit={this.handleSubmit}>
            <label>
              Choose your wishlist:
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="wishlist">Primary</option>
                <option value="wishlist2">Second</option>
                <option value="wishlist3">Third</option>
              </select>
            </label>
            <input type="submit" value="Submit" />

            <span className="add-button" onClick={this.handleSave}>
              Save
            </span>
          </form>
          {/* <h1>{this.state.currentWishlist.wishlistName}</h1> */}

          {/*/////////////////////////////////////*/}
          {/*/////////////////////////////////////*/}
        </div>
      </div>
    );
  }
}

const currentItems = state => {
  return {
    currentList: state.currentWishlist,
    currentItems: state.wishlist.items,
    currentName: state.wishlist.wishlistName,
    wishlist: state.wishlist,
    wishlist2: state.wishlist2,
    wishlist3: state.wishlist3
  };
};

const changeItems = dispatch => {
  return {
    clickRemove: id => {
      dispatch(wishRemove(id)); // dispatch action wishRemove that will trigger state change.
    },
    clickWishToCart: id => {
      dispatch(wishToCart(id)); // dispatch action wishToCart that will trigger state change.
    },
    mySubmitHandler: event => {
      dispatch(changeWishName(event)); // dispatch action changeWishName that will trigger state change.
    },
    handleSave: event => {
      dispatch(currentWishName(event)); // dispatch action urrentWishName that will trigger state change.
    }
  };
};

export default connect(currentItems, changeItems)(Wishlist); // passing these 2 functions as props to component.
