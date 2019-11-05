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
      <div className="home-page-list" key={this.props.book.id}>
        <div className="container">
          <span
            className="clickAddButton"
            onClick={() => {
              this.clickOnDetails(this.props.book.id);
            }}
          >
            <Link to="/details">
              <span href="#tile" className="tile">
                <div className="item">
                  <div className="book_cover">
                    <img
                      src={this.props.book.book_cover}
                      alt="bookcover placeholder"
                      width="200"
                      height="200"
                    ></img>
                  </div>
                  <div className="details">
                    <p className="book_title">
                      <h5>{this.props.book.book_name}</h5>
                    </p>
                    <div className="book_details">
                      <h6 className="card-subtitle mb-2 text-muted">
                        Author Bio: {this.props.book.author_biography}
                      </h6>
                      <span className="card-subtitle mb-2 text-muted">
                        Publish Date:{" "}
                        {this.props.book.book_publishing_info + " "}
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
                    </div>
                  </div>
                </div>
              </span>
            </Link>
          </span>
          <p>
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
          </p>
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
