import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { wishRemove, wishToCart, changeWishName } from "./WishlistFunctions.js";
import "./Wishlist.css";

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = { showPopup: false };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
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
  clickAdd = id => {
    this.props.clickAdd(id);
  };
  clickSubtr = id => {
    this.props.clickSubtr(id);
  };
  clickSave = id => {
    let cart = this.props.items.length;
    this.props.clickSave(id);
    if (cart === this.props.items.length) {
    }
  };
  clickSaveToCart = id => {
    this.props.clickSaveToCart(id);
  };
  clickSaveRemove = id => {
    this.props.clickSaveRemove(id);
  };
  clickSaveToWish = id => {
    this.props.clickSaveToWish(id);
  };
  render() {
    let currentWishlist = this.props.items.length ? (
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
            {this.props.currentName} ({this.props.items.length})
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

          <ul className="wishlist">{currentWishlist}</ul>
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
            value="Create New List"
            className="btn"
            style={{ flex: "1" }}
          />
        </form>
      </div>
    );
  }
}

const currentItems = state => {
  return {
    items: state.wishlist.items,
    currentName: state.wishlist.wishlistName,
    wishlist: state.wishlist
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
    ///////////////////
    /////////////////////
    mySubmitHandler: event => {
      dispatch(changeWishName(event));
    }
    /////////////////////
    /////////////////////
  };
};

export default connect(
  currentItems,
  changeItems
)(Wishlist);
