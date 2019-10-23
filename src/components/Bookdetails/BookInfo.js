import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Ratingsystem } from "../Ratingsystem/Ratingsystem";

class BookInfo extends Component {
  clickRemove = id => {
    this.props.clickRemove(id);
  };

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
    total: state.total
  };
};

export default connect(currentItems)(BookInfo);
