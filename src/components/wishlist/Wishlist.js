import React, { Component } from "react";

//////////////////////////////////
import { connect } from "react-redux";
//////////////////////////////////

import { Link } from "react-router-dom";
import { wishRemove } from "./WishlistFunctions";

////////////////////////////////
import { wishToCart } from "./WishlistFunctions";
//////////////////////////////

import "./Wishlist.css";

class Wishlist extends Component {
  constructor() {
    super();
    // initialize your options array on your state
    this.state = {
      options: []
    };
  }
  onChange(e) {
    // current array of options
    const options = this.state.options;
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
              <name htmlFor={item.id}>{item.book_name}</name>
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
          <h4>Wishlist ({this.props.items.length})</h4>
          <ul className="wishlist">{wishlist}</ul>
          <span
            class="del-button"
            onClick={() => {
              this.state.options.map(number => this.props.clickRemove(number));
            }}
          >
            Remove
          </span>

          {/*//////////////////////////////////////////////////////////////////////////*/}

          <span
            class="add-button"
            onClick={() => {
              this.state.options.map(number =>
                this.props.clickWishToCart(number)
              );
            }}
          >
            Add To Cart
          </span>

          {/*/////////////////////////////////////////////////////////////*/}
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
    ////////////////////////
    ////////////////////////
    clickWishToCart: id => {
      dispatch(wishToCart(id));
    }
    ///////////////////////
    //////////////////////
  };
};

export default connect(
  currentItems,
  changeItems
)(Wishlist);
