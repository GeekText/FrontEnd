import React, { Component } from "react";
import AuthorNames from "./AuthorNames";
import { connect } from "react-redux";
import { refresh, filtered } from "./FilterFunctions";
import "./Filter.css";
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredItems: [],
      items: [],
      searched: false,
      exampleInputPrice1: 0,
      selectValue: "none",
      selectGenre: "All",
      selectRating: "All",
      selectResults: "All"
    };
    this.commonChange = this.commonChange.bind(this);
    this.submitFilter = this.submitFilter.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleDropdownGenre = this.handleDropdownGenre.bind(this);
    this.handleDropdownRating = this.handleDropdownRating.bind(this);
    this.handleDropdownResults = this.handleDropdownResults.bind(this);
  }
  commonChange(event) {
    console.log("Price Filter", [event.target.name], event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  submitFilter(event) {
    event.preventDefault();
    this.searching();
  }
  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value }, function() {
      console.log("Show Author", this.state.selectValue);
    });
  }
  handleDropdownGenre(e) {
    this.setState({ selectGenre: e.target.value }, function() {
      console.log("Show Genre", this.state.selectGenre);
    });
  }
  handleDropdownRating(e) {
    this.setState({ selectRating: e.target.value }, function() {
      console.log("Show Rating", this.state.selectRating);
    });
  }
  handleDropdownResults(e) {
    this.setState({ selectResults: e.target.value }, function() {
      console.log("Results limit", this.state.selectResults);
    });
  }
  sendFilter(list) {
    this.props.sendFilter(list);
  }
  searching() {
    //Temp list for filter
    let filteredlist;
    //Sort by Author
    let name = this.state.selectValue.split(",");
    if (name !== "none") {
      let listFirstName = this.props.items.filter(
        item => item.author_first_name === name[0]
      );
      let listLastName = this.props.items.filter(
        item => item.author_last_name === name[1]
      );
      filteredlist = listFirstName.filter(
        value => -1 !== listLastName.indexOf(value)
      );
    }
    //Sort by Genre
    let genre = this.state.selectGenre.split("|");
    console.log(genre);
    if (this.state.selectGenre !== "All") {
      var i;
      function mapCallback(item) {
        let bookGenre = item.book_genre.split("|");
        for (var x = 0; x < bookGenre.length; x++) {
          console.log(
            "Check",
            bookGenre[x] === genre[i],
            bookGenre[x],
            genre[i]
          );
          if (bookGenre[x] === genre[i]) {
            return true;
          }
        }
        return false;
      }
      if (filteredlist && filteredlist.length) {
        for (i = 0; i < genre.length; i++) {
          filteredlist = filteredlist.filter(mapCallback);
        }
      } else {
        for (i = 0; i < genre.length; i++) {
          filteredlist = this.props.items.filter(mapCallback);
        }
      }
    }
    //Sort by Rating
    if (this.state.selectRating !== "All") {
      var rating = parseInt(this.state.selectRating);
      if (filteredlist && filteredlist.length) {
        filteredlist = filteredlist.filter(item => item.book_rating === rating);
      } else {
        filteredlist = this.props.items.filter(
          item => item.book_rating === rating
        );
      }
    }
    //Sort by Price
    var number = parseInt(this.state.exampleInputPrice1);
    if (Number.isInteger(number) && number > 0) {
      if (filteredlist && filteredlist.length) {
        filteredlist = filteredlist.filter(item => item.book_price === number);
      } else {
        filteredlist = this.props.items.filter(
          item => item.book_price === number
        );
      }
    }
    //Sort by Results
    if (this.state.selectResults !== "All") {
      var limit = parseInt(this.state.selectResults);
      if (this.state.filteredItems.length > limit) {
        var offset = this.state.filteredItems.length - limit;
        if (filteredlist && filteredlist.length) {
          filteredlist = filteredlist.slice(offset);
        } else {
          filteredlist = this.props.items.slice(offset);
        }
      }
    }
    //Set Filter
    this.setState({ filteredItems: filteredlist, searched: true }, function() {
      this.sendFilter(this.state.filteredItems);
    });
  }
  render() {
    let filtered =
      this.state.filteredItems.length || this.state.searched ? (
        this.state.filteredItems.length ? (
          [
            <div className="filter-number" key="filters">
              <h4>Filtered items: ({this.state.filteredItems.length})</h4>
            </div>
          ]
        ) : (
          <div className="filter-number" key="filters2">
            <h4>No items found: ({this.state.filteredItems.length})</h4>
          </div>
        )
      ) : (
        <div></div>
      );
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
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={this.handleDropdownGenre}
                >
                  <option value="All">All</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Drama">Drama</option>
                  <option value="Horror">Horror</option>
                  <option value="Documentary">Documentary</option>
                  <option value="Romance">Romance</option>
                  <option value="Action">Action</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Crime">Crime</option>
                  <option value="Romance">Romance</option>
                  <option value="Fantasy">Fantasy</option>
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
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={this.handleDropdownRating}
                >
                  <option value="All">All</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
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
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={this.handleDropdownResults}
                >
                  <option value="All">All</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
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
                <select
                  className="form-control"
                  id="dropdown"
                  onChange={this.handleDropdownChange}
                >
                  {/*Gets all the author's name and displays them*/}
                  <option value="none">none</option>
                  <AuthorNames bookdetails={this.props.bookdetails} />
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
                  name="exampleInputPrice1"
                  placeholder="0"
                  // TODO Maybe
                  //onKeyPress={this.searchPrice(39)}
                  onChange={this.commonChange}
                />
              </div>
              <input type="submit" value="Submit" onClick={this.submitFilter} />
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
            {filtered}
          </div>
        </div>
      </div>
    );
  }
}
const currentItems = state => {
  return {
    items: state.items
  };
};
const changeItems = dispatch => {
  return {
    recentState: id => {
      dispatch(refresh(id));
    },
    sendFilter: event => {
      dispatch(filtered(event));
    }
  };
};
export default connect(currentItems, changeItems)(Filter);
