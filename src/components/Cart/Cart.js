import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addQuantity, subtractQuantity, removeItem } from "./CartFunctions.js";
import missing_img from "./cover.png";

class Cart extends Component {
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
    let addedItems = this.props.items.length ? (
      this.props.items.map(item => {
        return (
          <div className="card-body" key={item.id}>
            <span className="card-title">Title: {item.book_name}</span>
            <div className="item-img">
              <img src={item.book_cover} alt={missing_img} className="" />
            </div>
            <i className="card-subtitle mb-2 text-muted">{item.book_desc}</i>
            <li>
              <b>Price: ${item.book_price}</b>
            </li>
            <li>
              <span
                className="clickAdd"
                onClick={() => {
                  this.clickAdd(item.id);
                }}
              >
                <Link to="/cart">
                  <i className="upItem"> + </i>
                </Link>
              </span>
              <b>Quantity: {item.quantity}</b>
              <span
                className="clickSubtr"
                onClick={() => {
                  this.clickSubtr(item.id);
                }}
              >
                <Link to="/cart">
                  <i className="downItem"> - </i>
                </Link>
              </span>
              <br></br>
              <span
                className="clickRemove"
                onClick={() => {
                  this.clickRemove(item.id);
                }}
              >
                <button className="delete-button">Delete</button>
              </span>
            </li>
          </div>
        );
      })
    ) : (
      <div>
        <p>Your shopping cart is empty.</p>
        <Link to="/#Items"> Shop Here</Link>
      </div>
    );
    return (
      <div className="container">
        <div className="#cart">
          <h4>Items in Cart:</h4>
          <ul className="current-items">{addedItems}</ul>
          <ul className="current-total">Total: ${this.props.total}</ul>
        </div>
      </div>
    );
  }
}

const currentItems = state => {
  return {
    items: state.addedItems,
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
    }
  };
};

export default connect(
  currentItems,
  changeItems
)(Cart);
