import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Ratingsystem } from "../Ratingsystem/Ratingsystem";
import { currentWishName } from "../wishlist/WishlistFunctions.js";
class BookInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "wishlist",
      currentWishlist: {
        // current wishlist for the drop down
        id: 0, // id number for that wishlist
        items: [], // book items saved in wishlist
        options: [], // option array
        wishlistName: "BookInfo" // name of the wishlist
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    event.persist();
    this.changeCurrentWishList();
    this.setState({}, function() {
      //Immediately changes state
      this.addCurrent();
      this.handleSave();
    });
  }
  addCurrent() {
    let wishItem = this.props.items.find(
      item => item.id === this.props.items[0].id
    );
    console.log(
      "Added to wishlist",
      wishItem,
      this.state.currentWishlist.items
    );
    let exists = this.state.currentWishlist.items.find(
      item => this.props.items[0].id === item.id
    );
    this.setState(state => {
      if (exists) {
        console.log("Item exists");
      } else {
        this.state.currentWishlist.items.push(wishItem);
      }
    });
  }
  handleSave() {
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
  render() {
    let addedItemID = this.props.items.length ? (
      this.props.items.map(item => {
        return (
          <div className="slot" key={item.id}>
            <div>
              <img
                src={item.book_cover}
                alt="Failed to load: book_cover"
                width="200"
                height="200"
                className="image"
              />
            </div>
            <p className="card-title">Title: {item.book_name}</p>
            <i className="card-subtitle mb-2 text-muted">{item.book_desc}</i>
            <p>
              <b>Price: ${item.book_price}</b>
            </p>

            <Ratingsystem></Ratingsystem>
            <form onSubmit={this.handleSubmit}>
              <label>
                Add to wishlist:
                <select value={this.state.value} onChange={this.handleChange}>
                  <option value="wishlist">
                    {this.props.wishlist.wishlistName}
                  </option>
                  <option value="wishlist2">
                    {this.props.wishlist2.wishlistName}
                  </option>
                  <option value="wishlist3">
                    {this.props.wishlist3.wishlistName}
                  </option>
                </select>
              </label>
              <input type="submit" value="Submit" />
            </form>
            <Link to="/#Items">
              <span href="#cart" className="links" type="button">
                Back to Home Page
              </span>
            </Link>
          </div>
        );
      })
    ) : (
      <div>
        <p>The item you're looking for is no longer here.</p>
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
          <h4>Book Details:</h4>
          <ul className="current-items">{addedItemID}</ul>
        </div>
      </div>
    );
  }
}

const currentItems = state => {
  return {
    items: state.addedItemID,
    catalog: state.items,
    wishlist: state.wishlist,
    wishlist2: state.wishlist2,
    wishlist3: state.wishlist3
  };
};
const changeItems = dispatch => {
  return {
    handleSave: event => {
      dispatch(currentWishName(event)); // dispatch action urrentWishName that will trigger state change.
    }
  };
};
export default connect(currentItems, changeItems)(BookInfo);
