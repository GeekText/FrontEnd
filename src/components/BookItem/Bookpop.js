import React from "react";
import "./BookItem.css";
import "./BookInfo.css";

class Popup extends React.Component{
    render()
    {
        return(
            <div className = "popup">
            <div className = "popup_inner">
            <br></br>
            <img
              src={this.props.book.book_cover}
              alt="bookcover placeholder"
              width="500"
              height="500"
            ></img>
            <div className = "container"></div>
            <button className = "popup-button" onClick = {this.props.closePopup}>
              Close
            </button>
        </div>
        </div>
        );

    }
}
export default Popup;