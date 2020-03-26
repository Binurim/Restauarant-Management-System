import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

 function RenderDish({dish}) {
    return (
      <div>
        <Card>
          <CardImg
            width="100%"
            src={dish.image}
            alt={dish.name}
          />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  };

  function FormatDate({string}) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  };

  function RenderComments ({comments}){
    const comment = comments.map(comment => {
      return (
        <div key={comment.id}>
          {comment.comment}
          <br />
          <br />
          {"-- "}
          {comment.author} , <FormatDate string={comment.date}/>
          <br />
          <br />
        </div>
      );
    });

    return <div>{comment}</div>;
  };

  const DishDetail=(props)=> {
    return (
      <div className="container">
        {props.dish ? (
          <div className="row">
            <div className="col-md-5 m-1 col-sm-12 col-xs-12 ">
              <RenderDish dish={props.dish}/>
            </div>
            <div className="col-md-5 m-1 col-sm-12 col-xs-12">
              <h4>Comments</h4>
              <div><RenderComments comments={props.dish.comments}/></div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }


export default DishDetail;