import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { wishRemove } from "./WishlistFunctions";
import { wishToCart } from "./WishlistFunctions";
import "./Wishlist.css";

class Wishlist extends Component {
  constructor() {
    super();
    // initialize your options array on your state
    this.state = {
      wishlist: [
        {
          id: 0,
          options: [],
          wishlistName: "Default"
        },
        {
          id: 1,
          options: [],
          wishlistName: "One"
        },
        {
          id: 2,
          options: [],
          wishlistName: "Two"
        }
      ]
    };
  }
  onChange(e) {
    // current array of options
    const options = this.state.wishlist[0].options;
    let index;

    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      options.push(+e.target.value);
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = options.indexOf(+e.target.value);
      options.splice(index, 1);
    }

    // update the state with the new array of options
    this.setState({ options: options });
  }
  clickWishToCart = id => {
    this.props.clickWishToCart(id);
  };

  mySubmitHandler = event => {
    event.preventDefault();
    const newList = this.state.wishlist.slice(); //copy the array
    newList[0].wishlistName = this.state.wishlistName; //execute the manipulations
    this.setState({ wishlist: newList });
    alert("You are submitting " + this.state.wishlistName);
  };
  myChangeHandler = event => {
    this.setState({ wishlistName: event.target.value });
  };

  render() {
    let wishlist = this.props.items.length ? (
      this.props.items.map(item => {
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
            {this.state.wishlist[0].wishlistName} ({this.props.items.length})
          </h4>
          <form onSubmit={this.mySubmitHandler} style={{ display: "flex" }}>
            <input
              type="text"
              name="title"
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
          <ul className="wishlist">{wishlist}</ul>
          <span
            className="del-button"
            onClick={() => {
              this.state.wishlist[0].options.map(number =>
                this.props.clickRemove(number)
              );
            }}
          >
            Remove
          </span>

          <span
            className="add-button"
            onClick={() => {
              this.state.wishlist.options.map(number =>
                this.props.clickWishToCart(number)
              );
            }}
          >
            Add To Cart
          </span>
          {/* <select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select> */}
        </div>
      </div>
    );
  }
}

const currentItems = state => {
  return {
    items: state.wishlist
  };
};

const changeItems = dispatch => {
  return {
    clickRemove: id => {
      dispatch(wishRemove(id));
    },
    clickWishToCart: id => {
      dispatch(wishToCart(id));
    }
  };
};

export default connect(
  currentItems,
  changeItems
)(Wishlist);
