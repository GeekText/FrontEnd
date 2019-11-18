import React from "react";
import "./home.css";
import Bookdetails from "../components/Bookdetails/Bookdetails";
import Filter from "../components/Filter/Filter";
import { filtered } from "../components/Filter/FilterFunctions";
import { connect } from "react-redux";
import { addDB } from "./homeFunctions.js";

const axios = require("axios");
const url = "https://geek-text-backend.herokuapp.com/api";

class home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookdetails: [
        {
          _id: "0",
          id: 0,
          book_name: "Loading...",
          book_cover: "http://dummyimage.com/350x350.png/cc0000/ffffff",
          author_first_name: "",
          author_last_name: "",
          author_biography: "",
          book_desc: "",
          book_genre: "",
          book_publisher: "",
          book_releaseDate: "",
          book_rating: 0,
          email: "",
          gender: "",
          book_publishing_info: "",
          book_copies_sold: 0,
          book_price: 0,
          quantity: 0
        }
      ],
      FetchedAt: null
    };

    this.state.bookdetails = this.props.items;
    if (this.state.bookdetails.length <= 1) {
      console.log(
        "No DATA on HOME PAGE: Length %d",
        this.state.bookdetails.length
      );
      this.getData();
    }
  }

  fixDB(event) {
    this.props.fixDB(event);
  }
  styling = {
    textAlign: "center"
  };
  sendFilter(list) {
    this.props.sendFilter(list);
  }

  async getData() {
    console.log("Getting DB data");
    try {
      const response = await axios.get(url);
      console.log("Incoming data " + response.data);
      if (response.data != null && response.data.length !== 0) {
        this.setState({ bookdetails: response.data });
      }
      console.log("Current state " + this.state.bookdetails);
      console.log("Sending DB to PageLogic");
      this.fixDB(this.state.bookdetails);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className="App" style={this.styling}>
        <h4>Books for Sale</h4>
        <Filter bookdetails={this.state.bookdetails} />
        <Bookdetails
          key={this.state.bookdetails}
          bookdetails={this.state.bookdetails}
        />
        <span
          onClick={() => this.sendFilter([])}
          to="/"
          href="#search"
          className="links"
          type="button"
        >
          Reset Search
        </span>
      </div>
    );
  }
}
const changeItems = dispatch => {
  return {
    fixDB: event => {
      dispatch(addDB(event));
    },
    sendFilter: event => {
      dispatch(filtered(event));
    }
  };
};
const currentItems = state => {
  return {
    items: state.items
  };
};

export default connect(currentItems, changeItems)(home);
