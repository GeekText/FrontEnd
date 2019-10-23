import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem } from "../Cart/CartFunctions";
import { addItemDetails } from "./BookFunctions";
import { addItemWish } from "../wishlist/WishlistFunctions";
import { Link } from "react-router-dom";
import "./BookItem.css";

export class Bookitem extends Component {
  // style= {"width": "18rem"}

  clickOn = id => {
    this.props.addItem(id);
  };
  clickOnDetails = id => {
    this.props.addItemDetails(id);
  };
  clickOnWish = id => {
    this.props.addItemWish(id);
  };
  render() {
    return (
      <div className="container">
        <div className="card-body">
          <span
            className="clickAddButton"
            onClick={() => {
              this.clickOnDetails(this.props.book.id);
            }}
          >
            <Link to="/details">
              <span href="#tile" className="tile">
                <h5 className="card-title">{this.props.book.book_name}</h5>
                <img
                  src={this.props.book.book_cover}
                  alt="bookcover placeholder"
                  width="100"
                  height="100"
                ></img>
                <br></br>
                <br></br>
                <h6 className="card-subtitle mb-2 text-muted">
                  Author Bio: {this.props.book.author_biography}
                </h6>
                <span className="card-subtitle mb-2 text-muted">
                  Publish Date: {this.props.book.book_publishing_info + " "}
                </span>
                <span className="card-subtitle mb-2 text-muted">
                  Release Date:{this.props.book.book_releaseDate}{" "}
                </span>
                <br></br>
                <span className="card-subtitle mb-2 text-muted">
                  Genre: {this.props.book.book_genre}{" "}
                </span>
                <br></br>
                <span className="card-subtitle mb-2 text-muted">
                  Rating: {this.props.book.book_rating}
                </span>
                <br></br>
                <span className="card-text">
                  {" "}
                  Publisher: {this.props.book.book_publisher}
                </span>
                <p className="card-text">
                  Author Name:{" "}
                  {this.props.book.author_first_name +
                    " " +
                    this.props.book.author_last_name}
                </p>
              </span>
            </Link>
          </span>
          <i>Price: ${this.props.book.book_price} </i>
          <span
            className="clickAddButton"
            onClick={() => {
              this.clickOn(this.props.book.id);
            }}
          >
            <button className="add-button" type="button">
              Add
            </button>
          </span>
          <span
            className="clickAddWish"
            onClick={() => {
              this.clickOnWish(this.props.book.id);
            }}
          >
            <button className="wish-button" type="button">
              Add to Wishlist
            </button>
          </span>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    items: state.items
  };
};

const checkCartReducer = dispatch => {
  return {
    addItem: id => {
      dispatch(addItem(id));
    },
    addItemDetails: id => {
      dispatch(addItemDetails(id));
    },
    addItemWish: id => {
      dispatch(addItemWish(id));
    }
  };
};

export default connect(
  mapStateToProps,
  checkCartReducer
)(Bookitem);
