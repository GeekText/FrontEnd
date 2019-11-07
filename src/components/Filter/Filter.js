import React, { Component } from "react";
import AuthorNames from "./AuthorNames";
import './Filter.css';
class Filter extends Component {

  constructor(props) {
    super(props);
  }

    //!TODO Esteban here HELP
    searchPrice = (price) => {
      // let filteredBookPrice = [this.props.bookdetails.map(book => {book.book_price == price})];
      let filteredBookPrice = [];
          this.setState(
            { bookdetails : filteredBookPrice})
    }

  render() {
      return (
      <div className="container">
        <div className="filter">
          <div className="alert alert-success" role="alert">
            <h3>Sort by</h3>
            <div className="form-check form-check-inline">

              <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck2"
              />
              <label className="form-check-label" htmlFor="defaultCheck2">
                Top sellers
              </label>

              <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck3"
              />
              <label className="form-check-label" htmlFor="defaultCheck3">
                Book Title
              </label>
            </div>
            <br></br>


              <div className="Martyn form-group row">
                  <label
                      htmlFor="inputPassword"
                      className="col-sm-2 col-form-label"
                  >
                      <p>Book Genre</p>
                  </label>
                  <div className="col-sm-10">
                      <select className="form-control" id="exampleFormControlSelect1">
                          <option>All</option>
                          <option>Comedy</option>
                          <option>Drama</option>
                          <option>Horror</option>
                          <option>Documentary</option>
                          <option>Romance</option>
                          <option>Action</option>
                          <option>Adventure</option>
                          <option>Mystery</option>
                          <option>Sci-Fi</option>
                          <option>Thriller</option>
                          <option>Crime</option>
                          <option>Romance</option>
                          <option>Fantasy</option>
                      </select>
                  </div>
              </div>


            <div className="Martyn form-group row">
              <label
                htmlFor="inputPassword"
                className="col-sm-2 col-form-label"
              >
                <p>Book Rating</p>
              </label>
              <div className="col-sm-10">
                <select className="form-control" id="exampleFormControlSelect1">
                  <option>All</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>

            <div className="Martyn form-group row">
              <label
                htmlFor="exampleFormControlSelect1"
                className="col-sm-2 col-form-label"
              >
                Results Per Page
              </label>
              <div className="col-sm-10">
                <select className="form-control" id="exampleFormControlSelect1">
                  <option>All</option>
                  <option>10</option>
                  <option>20</option>
                </select>
              </div>
            </div>

            {/*Todo have to do for loop to get author names to display*/}
            <div className="Martyn form-group row">
              <label
                htmlFor="inputPassword"
                className="col-sm-2 col-form-label"
              >
                Sort by author
              </label>
              <div className="col-sm-10">
                <select className="form-control" id="exampleFormControlSelect1">
                  {/*Gets all the author's name and displays them*/}
                  <option>none</option>
                  <AuthorNames bookdetails={this.props.bookdetails}/>
                </select>
              </div>
            </div>

            <div className="Martyn form-group row">
              <label
                htmlFor="exampleInputPassword1"
                className="col-sm-2 col-form-label"
              >
                Price
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputPrice1"
                  placeholder="20"
                  // TODO Maybe
                  onChange={this.searchPrice(31)}
                />
              </div>
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <input
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                  />
                </div>
              </div>
              <input
              type="text"
              className="form-control"
              placeholder="To sort by date put year here"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
