import React from "react";

class Popup extends React.Component {
  render() {
    return (
      <div className="popup2">
        <div className="popup_inner2">
          <img
            src={this.props.book_cover}
            alt="Failed to load: book_cover"
            width="600"
            height="600"
            className="image"
          />
          <div className="container"></div>
          <button className="popup-button" onClick={this.props.closePopup}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default Popup;
