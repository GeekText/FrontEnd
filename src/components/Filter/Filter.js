import React, { Component } from "react";
import AuthorNames from "./AuthorNames";
import { connect } from "react-redux";
import { refresh, filtered } from "./FilterFunctions";
import "./Filter.css";
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      filteredItems: [],
      items: [],
      searched: false,
      exampleInputPrice1: 0,
      selectValue: "none",
      selectGenre: "All",
      selectRating: "All",
      selectResults: "All",
      inputDate: "2019"
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
  myChangeHandler = event => {
    event.preventDefault(); // prevent refleshing.
    event.persist();
    let change = event.target.value;
    this.setState(state => {
      return {
        ...state,
        inputDate: change
      };
    });
  };
  searching() {
    //Temp list for filter
    let filteredlist = [];

    console.log("Length before Author", filteredlist.length);
    //Sort by Author
    let name = this.state.selectValue.split(",");
    if (this.state.selectValue !== "none") {
      let listFirstName, listLastName;
      if (filteredlist && filteredlist.length) {
        listFirstName = filteredlist.filter(
          item => item.author_first_name === name[0]
        );
        listLastName = filteredlist.filter(
          item => item.author_last_name === name[1]
        );
      } else {
        listFirstName = this.props.items.filter(
          item => item.author_first_name === name[0]
        );
        listLastName = this.props.items.filter(
          item => item.author_last_name === name[1]
        );
      }
      filteredlist = listFirstName.filter(
        value => -1 !== listLastName.indexOf(value)
      );
    }
    console.log("Length before Genre", filteredlist.length);
    //Sort by Genre
    let genre = this.state.selectGenre.split("|");
    if (this.state.selectGenre !== "All") {
      var i;
      function mapCallback(item) {
        let bookGenre = item.book_genre.split("|");
        for (var x = 0; x < bookGenre.length; x++) {
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
    console.log("Length before Rating", filteredlist.length);
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
    console.log("Length before Price", filteredlist.length);
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
    console.log("Length before Top Sellers", filteredlist.length);
    //Sort by Top Sellers book_copies_sold
    if (this.refs.top_sellers.checked) {
      if (this.refs.book_titles.checked) {
        this.refs.book_titles.checked = false;
      }
      function sortNumber(a, b) {
        return a.book_copies_sold - b.book_copies_sold;
      }
      if (filteredlist && filteredlist.length) {
        filteredlist = filteredlist.sort(sortNumber);
      } else {
        filteredlist = this.props.items.slice().sort(sortNumber);
      }
    }
    console.log("Length before ABC", filteredlist.length);
    //Sort by Book Title (ABC)
    if (this.refs.book_titles.checked) {
      if (this.refs.top_sellers.checked) {
        this.refs.top_sellers.checked = false;
      }
      if (filteredlist && filteredlist.length) {
        filteredlist = filteredlist.sort(function(a, b) {
          var nameA = a.book_name.toLowerCase(),
            nameB = b.book_name.toLowerCase();
          if (nameA < nameB) {
            return -1;
          } //sort string ascending
          if (nameA > nameB) {
            return 1;
          }
          return 0; //default return value (no sorting)
        });
      } else {
        filteredlist = this.props.items.slice().sort(function(a, b) {
          var nameA = a.book_name.toLowerCase(),
            nameB = b.book_name.toLowerCase();
          if (nameA < nameB) {
            return -1;
          } //sort string ascending
          if (nameA > nameB) {
            return 1;
          }
          return 0; //default return value (no sorting)
        });
      }
    }
    console.log("Length before Date", filteredlist.length);
    //Sort by Date
    if (this.refs.sort_dates.checked) {
      if (this.refs.top_sellers.checked) {
        this.refs.top_sellers.checked = false;
      }
      if (this.refs.book_titles.checked) {
        this.refs.book_titles.checked = false;
      }
      let userDate = this.state.inputDate;
      function sortYear(item) {
        let yearDate = item.book_releaseDate.split("/");
        return userDate === yearDate[2];
      }
      if (filteredlist && filteredlist.length) {
        filteredlist = filteredlist.filter(item => sortYear(item));
        filteredlist = filteredlist.slice().sort(function(a, b) {
          let date2 = b.book_releaseDate.split("/");
          let date1 = a.book_releaseDate.split("/");
          return (
            new Date([userDate] + "-" + date1[0] + "-" + date1[1]) -
            new Date([userDate] + "-" + date2[0] + "-" + date2[1])
          );
        });
      } else {
        filteredlist = this.props.items.filter(item => sortYear(item));
        filteredlist = filteredlist.slice().sort(function(a, b) {
          let date2 = b.book_releaseDate.split("/");
          let date1 = a.book_releaseDate.split("/");
          return (
            new Date([userDate] + "-" + date1[0] + "-" + date1[1]) -
            new Date([userDate] + "-" + date2[0] + "-" + date2[1])
          );
        });
      }
    }
    console.log("Length before Res", filteredlist.length);
    //Sort by Results
    if (this.state.selectResults !== "All") {
      var limit = parseInt(this.state.selectResults);
      if (filteredlist.length > limit) {
        if (filteredlist && filteredlist.length) {
          filteredlist = filteredlist.slice(0, limit);
        } else {
          filteredlist = this.props.items.slice(0, limit);
        }
      }
    }
    console.log("Length before DB", filteredlist.length);
    //Set Filter
    this.setState({ filteredItems: filteredlist, searched: true }, function() {
      this.sendFilter(this.state.filteredItems);
    });
    this.forceStateUpdate();
  }
  forceStateUpdate() {
    this.setState({ state: this.state });
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
            <h4>({this.state.filteredItems.length}) items in filter</h4>
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
              <label>
                <input
                  className="form-check-label"
                  htmlFor="defaultCheck2"
                  type="checkbox"
                  ref="top_sellers"
                />{" "}
                Top sellers
              </label>
              <label>
                <input
                  className="form-check-label"
                  htmlFor="defaultCheck3"
                  type="checkbox"
                  ref="book_titles"
                />{" "}
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
                    ref="sort_dates"
                  />
                </div>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="2019"
                onChange={this.myChangeHandler}
                name="date_text"
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
