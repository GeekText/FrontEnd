import React from "react";
import Bookitem from "../BookItem/BookItem";

class Bookdetails extends React.Component {
  componentDidCatch(error) {
    return this.props.bookdetails.map(book => (
      <div className="bookitem">
        <Bookitem key={book.id} book={book} />
      </div>
    ));
  }
  render() {
    try {
      return this.props.bookdetails.map(book => (
        <div className="bookitem" key={book.id}>
          <Bookitem key={book.id} book={book} />
        </div>
      ));
    } catch (error) {
      console.error(error);
    }
  }
}

export default Bookdetails;
