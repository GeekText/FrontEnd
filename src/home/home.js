import React from "react";
import "./home.css";
import Bookdetails from "../components/Bookdetails/Bookdetails";
import Filter from "../components/Filter/Filter";
import { connect } from "react-redux";

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

  styling = {
    textAlign: "center"
  };
  // componentWillMount()
  // {
  //     // Clear the interval right before component unmount
  //     clearInterval(this.interval);
  // }

  async getData() {
    console.log("Getting DB data");
    try {
      const response = await axios.get(url);
      console.log("Incoming data " + response.data);
      if (response.data != null) {
        this.setState({ bookdetails: response.data });
      }
      console.log("Current state " + this.state.bookdetails);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className="App" style={this.styling}>
        <h4>Books for Sale</h4>
        <Filter></Filter>
        <Bookdetails
          key={this.state.bookdetails}
          bookdetails={this.state.bookdetails}
        />
      </div>
    );
  }
}

const currentItems = state => {
  return {
    items: state.items
  };
};

export default connect(currentItems)(home);
