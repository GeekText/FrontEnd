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
        id: 0,
        items: [],
        options: [],
        wishlistName: "Pick a list"
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.changeCurrentWishList();
  }
  handleSave(event) {
    event.preventDefault();
    this.props.handleSave(this.state.currentWishlist);
  }
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

  mySubmitHandler = event => {
    event.preventDefault();
    this.props.mySubmitHandler(this.state.wishlistName);
  };

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
    let currentlist = this.props.currentItems.length ? (
      this.props.currentItems.map(item => {
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
            {this.props.currentName} ({this.props.currentItems.length})
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
          <h1>{this.state.currentWishlist.wishlistName}</h1>

          {/*/////////////////////////////////////*/}
          {/*/////////////////////////////////////*/}
        </div>
      </div>
    );
  }
}

const currentItems = state => {
  return {
    //////////////////////////////
    //////////////////////////////
    currentList: state.currentWishlist,
    currentItems: state.wishlist.items,
    currentName: state.wishlist.wishlistName,
    wishlist: state.wishlist,
    wishlist2: state.wishlist2,
    wishlist3: state.wishlist3
    //////////////////////////////
    ///////////////////////////////
  };
};

const changeItems = dispatch => {
  return {
    clickRemove: id => {
      dispatch(wishRemove(id));
    },
    clickWishToCart: id => {
      dispatch(wishToCart(id));
    },
    mySubmitHandler: event => {
      dispatch(changeWishName(event));
    },
    handleSave: event => {
      dispatch(currentWishName(event));
    }
  };
};

export default connect(
  currentItems,
  changeItems
)(Wishlist);
