import React, { useState } from "react";
import "./styles.css";

//Todo Figure out why `export default Ratingsystem;` does not work
export class Ratingsystem extends React.Component {
  render() {
    return (
      <div className="">
        <label>
          <Checkbox
            checked={this.checked}
            onChange={this.handleCheckboxChange}
          />
          <span>Do not show username (Anonymous)</span>
        </label>
        <StarRating totalStars={5} />
        <CommentBox data={commentData} />,<h1>Show Other Ratings Here</h1>
      </div>
    );
  }
}

var createClass = require("create-react-class");

const Checkbox = props => <input type="checkbox" {...props} />;

const Star = ({ selected = false, onClick = f => f }) => (
  <div className={selected ? "star selected" : "star"} onClick={onClick} />
);

const StarRating = ({ totalStars }) => {
  const [starsSelected, selectStar] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={i < starsSelected}
          onClick={() => selectStar(i + 1)}
        />
      ))}
      <p>
        {starsSelected} of {totalStars} stars
      </p>
    </div>
  );
};

var commentData = [
  {
    author: "Eric Jerez",
    text: "Horrible book"
  },
  {
    author: "Jeffffffff",
    text: "Amazing!"
  }
];
var CommentBox = createClass({
  getInitialState: function() {
    return {
      data: commentData
    };
  },
  handleCommentSubmit: function(comment) {
    this.props.data.push(comment);
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({ data: newComments });
  },
  render: function() {
    return (
      <div className="comment-box">
        <CommentForm
          data={this.props.data}
          onCommentSubmit={this.handleCommentSubmit}
        />
        <CommentList data={this.props.data} />
      </div>
    );
  }
});
var CommentList = createClass({
  render: function() {
    return (
      <div className="comment-list">
        {this.props.data.map(function(c) {
          return <Comment author={c.author} text={c.text} key={c.text} />;
        })}
      </div>
    );
  }
});

var CommentForm = createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var authorVal = e.target[0].value.trim();
    var textVal = e.target[1].value.trim();
    if (!textVal || !authorVal) {
      return;
    }
    this.props.onCommentSubmit({ author: authorVal, text: textVal });
    e.target[0].value = "";
    e.target[1].value = "";
    return;
  },
  render: function() {
    return (
      <form className="comment-form form-group" onSubmit={this.handleSubmit}>
        <div className="input-group">
          <span className="input-group-addon">Name</span>
          <input type="text" placeholder="Your name" className="form-control" />
        </div>
        <div className="input-group">
          <span className="input-group-addon">Comment</span>
          <input
            type="text"
            placeholder="Say something..."
            className="form-control"
          />
        </div>
        <input type="submit" value="Post" className="btn btn-primary" />
      </form>
    );
  }
});
var Comment = createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="author">{this.props.author}</h2>
        {this.props.text}
      </div>
    );
  }
});
