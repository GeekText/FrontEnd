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
      items: []
    };
    this.commonChange = this.commonChange.bind(this);
    this.submitFilter = this.submitFilter.bind(this);
    this.state.exampleInputPrice1 = 39;
  }
  commonChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  recentState(event) {
    //this.props.recentState(event);
  }
  submitFilter(event) {
    event.preventDefault();
    this.searchPrice(this.state.exampleInputPrice1);
  }
  sendFilter(list) {
    this.props.sendFilter(list);
  }
  searchPrice(price) {
    this.recentState();
    var number = parseInt(price, 10);
    console.log(number);
    let newlist = this.props.items.filter(item => item.book_price === number);
    this.setState({ filteredItems: newlist }, function() {
      //Immediately changes state
      this.sendFilter(this.state.filteredItems);
    });
  }

  render() {
    return (
      <div className="container">
        <h4>({this.state.filteredItems.length})</h4>
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
                  placeholder="39"
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
export default connect(
  currentItems,
  changeItems
)(Filter);
