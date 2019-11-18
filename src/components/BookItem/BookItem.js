import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem } from "../Cart/CartFunctions";
import { addItemDetails } from "./BookFunctions";
import { addItemWish } from "../wishlist/WishlistFunctions";
import "../wishlist/Wishlist";
import { Link } from "react-router-dom";
import { filtered } from "../Filter/FilterFunctions";
import "./BookItem.css";

export class Bookitem extends Component {
  clickOn = id => {
    this.props.addItem(id);
  };
  clickOnDetails = id => {
    this.props.addItemDetails(id);
  };
  clickOnWish = id => {
    this.props.addItemWish(id);
  };
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
  render() {
    let bookInfo = (
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
            <h5 className="book_title">
              <p>{this.props.book.book_name}</p>
            </h5>
            <div className="book_details">
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
                <Link
                  to="/search"
                  className="clickAddButton"
                  onClick={() =>
                    this.submitFilter([
                      this.props.book.author_first_name,
                      this.props.book.author_last_name
                    ])
                  }
                >
                  {this.props.book.author_first_name +
                    " " +
                    this.props.book.author_last_name}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </span>
    );
    return (
      <div className="home-page-list" key={this.props.book.id}>
        <div className="container">
          <span
            className="clickAddButton"
            onClick={() => {
              this.clickOnDetails(this.props.book.id);
            }}
          >
            <Link to="/details">{bookInfo}</Link>
          </span>
          <p className="home_buttons">
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
    },
    sendFilter: event => {
      dispatch(filtered(event));
    }
  };
};

export default connect(mapStateToProps, checkCartReducer)(Bookitem);
