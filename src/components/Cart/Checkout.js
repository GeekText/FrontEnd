import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  addQuantity,
  subtractQuantity,
  removeItem,
  saveAdd,
  saveAddToCart,
  saveRemove,
  addItemWish
} from "./CartFunctions.js";
import { filtered } from "../Filter/FilterFunctions";
import "./Cart.css";

class Checkout extends Component {
  searchAuthor(name) {
    let listFirstName;
    let listLastName;
    listFirstName = this.props.items.filter(
      item => item.author_first_name === name[0]
    );
    listLastName = this.props.items.filter(
      item => item.author_last_name === name[1]
    );

    let names = listFirstName.filter(
      value => -1 !== listLastName.indexOf(value)
    );
    this.sendFilter(names);
  }

  submitFilter(name) {
    this.searchAuthor(name);
  }
  sendFilter(list) {
    this.props.sendFilter(list);
  }

  clickRemove = id => {
    this.props.clickRemove(id);
  };
  clickAdd = id => {
    this.props.clickAdd(id);
  };
  clickSubtr = id => {
    this.props.clickSubtr(id);
  };
  render() {
    let cart = this.props.items.length ? (
      this.props.items.map(item => {
        return (
          <div className="shopping-cart-list" key={item.id}>
            <div className="item">
              <div className="image">
                <img
                  src={item.book_cover}
                  alt="Failed to load: book_cover"
                  width="200"
                  height="200"
                />
              </div>
              <div className="description">
                <span className="card-title">
                  <h5 className="book_title">{item.book_name}</h5>
                  <span className="author">
                    By:{" "}
                    <b
                      className="clickAddButton"
                      onClick={() =>
                        this.submitFilter([
                          item.author_first_name,
                          item.author_last_name
                        ])
                      }
                    >
                      <Link to="/search">
                        {item.author_first_name + " " + item.author_last_name}
                      </Link>
                    </b>{" "}
                    ({item.gender})
                  </span>
                  <i className="card-subtitle mb-2 text-muted">
                    {item.book_desc}
                  </i>
                  <div className="additional-details">
                    <div className="stats">
                      <span className="publisher">
                        Publisher: {item.book_publisher}
                      </span>
                      <span className="publisher">
                        Released: {item.book_releaseDate}
                      </span>
                    </div>
                    <div className="stats">
                      <span className="publisher">
                        Books Sold: {item.book_copies_sold}
                      </span>
                      <span className="publisher">
                        Rating: {item.book_rating} of 5
                      </span>
                    </div>
                  </div>
                  <span className="bio">
                    <i className="text-muted">Bio: "{item.author_biography}"</i>
                  </span>
                  <span className="email">({item.email})</span>
                </span>
              </div>
              <div className="buttons">
                <div className="item-price">
                  <span>${item.book_price * item.quantity}</span>
                  <i className="item-each text-muted">
                    ${item.book_price} each
                  </i>
                </div>
                <div className="quantity">
                  Qty:
                  <br></br>
                  <button
                    className="qty-button"
                    type="button"
                    name="button"
                    onClick={() => {
                      this.clickAdd(item.id);
                    }}
                  >
                    +
                  </button>
                  <b> {item.quantity} </b>
                  <button
                    className="qty-button"
                    type="button"
                    name="button"
                    onClick={() => {
                      this.clickSubtr(item.id);
                    }}
                  >
                    -
                  </button>
                </div>
                <br></br>
                <span
                  className="del-button"
                  onClick={() => {
                    this.clickRemove(item.id);
                  }}
                >
                  Remove
                </span>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div>
        <p>There seems to be a problem with your order.</p>
        <Link to="/#Items">
          <span href="#cart" className="links" type="button">
            Go Back
          </span>
        </Link>
      </div>
    );

    let subtotal = this.props.items.length ? (
      [
        <div className="subtotal-price" key="Price">
          <b>Subtotal: ${this.props.total}</b>
          <br></br>
          <Link to="/checkout" className="checkout_btn">
            Checkout
          </Link>
        </div>
      ]
    ) : (
      <div></div>
    );
    return (
      <div className="container">
        <div className="#cart">
          <br></br>
          <h5>Pay with</h5>
          <ul className="current-saved">{}</ul>
          <h5>Ship to </h5>
          <h5>Review items ({this.props.items.length})</h5>
          <ul className="current-items">{cart}</ul>
          <div className="shopping-cart">
            <h5>{subtotal}</h5>
          </div>
        </div>
      </div>
    );
  }
}
const currentItems = state => {
  return {
    items: state.addedItems,
    savedItems: state.savedItems,
    wishlist: state.wishlist.items,
    total: state.total
  };
};

const changeItems = dispatch => {
  return {
    clickRemove: id => {
      dispatch(removeItem(id));
    },
    clickAdd: id => {
      dispatch(addQuantity(id));
    },
    clickSubtr: id => {
      dispatch(subtractQuantity(id));
    },
    clickSave: id => {
      dispatch(saveAdd(id));
    },
    clickSaveToCart: id => {
      dispatch(saveAddToCart(id));
    },
    clickSaveRemove: id => {
      dispatch(saveRemove(id));
    },
    clickSaveToWish: id => {
      dispatch(addItemWish(id));
    },
    sendFilter: event => {
      dispatch(filtered(event));
    }
  };
};

export default connect(currentItems, changeItems)(Checkout);
