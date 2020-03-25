import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    
  componentDidMount() {
    console.log("Dishdetail Component componentDidMount is invoked");
  }

  componentDidUpdate() {
    console.log("Dishdetail Component componentDidUpdate is invoked");
  }

  renderDish = dish => {
    if (dish != null) {
      return (
        <div>
          <Card>
            <CardImg
              width="100%"
              src={this.props.dish.image}
              alt={this.props.dish.name}
            />
            <CardBody>
              <CardTitle>{this.props.dish.name}</CardTitle>
              <CardText>{this.props.dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  renderComments = comments => {
    if (comments != null) {
      return (
        <div key={comments.id}>
          {comments.comment}
          <br />
          <br />
          {"-- "}
          {comments.author} , {this.formatDate(comments.date)}
          <br />
          <br />
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  render() {
    console.log("Dishdetail Component render is invoked");

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-5 m-1 col-sm-12 col-xs-12 ">
            {this.renderDish(this.props.dish)}
          </div>
          <div className="col-md-5 m-1 col-sm-12 col-xs-12">
            <h4>Comments</h4>
            {this.props.dish ? (
              <div>
                {" "}
                {this.props.dish.comments.map(comment => {
                  return (
                    <div key={comment.id}>{this.renderComments(comment)}</div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default DishDetail;