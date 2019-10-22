import React from "react";
import Bookitem from "../BookItem/BookItem";

class Bookdetails extends React.Component {
  render() {
    try {
      return this.props.bookdetails.map(book => (
        <div className="bookitem">
          <Bookitem key={book.id} book={book} />
        </div>
      ));
    } catch (error) {
      console.error(error);
    }
  }
}

export default Bookdetails;
