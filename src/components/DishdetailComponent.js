import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import CommentForm from './CommentForm';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import { FadeTransform} from 'react-animation-components';

 function RenderDish({dish}) {
    return (
      <div>
          <FadeTransform
              in
              transformProps={{
                  exitTransform: 'scale(0.5) translateY(-50%)'
              }}>
            <Card>
              <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
              <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
              </CardBody>
            </Card>
        </FadeTransform>
      </div>
    );
  };

  function FormatDate({string}) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  };

  function RenderComments ({comments, postComment, dishId}){
   
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

    return (
    <div>
       {comment}
      <CommentForm dishId={dishId} postComment={postComment}/>
     </div>
     );
  };

  const DishDetail=(props)=> {
    if (props.isLoading){
      return(
        <div className="container">
          <div className="row">
            <Loading/>
          </div>
        </div>
      );
    }
    else if(props.errMess){
      return(
        <div className="container">
          <div className="row">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      );

    }
    else if (props.dish!= null)
    return (
      <div className="container">
           <div className="row">
                 <Breadcrumb>
                    <BreadcrumbItem> <Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                 </Breadcrumb>
                 <div className="col-12">
                   <h3>{props.dish.name}</h3><hr/>
                 </div>
               </div>
        {props.dish ? (
          <div className="row">
            <div className="col-md-5 m-1 col-sm-12 col-xs-12 ">
              <RenderDish dish={props.dish}/>
            </div>
            <div className="col-md-5 m-1 col-sm-12 col-xs-12">
              <h4>Comments</h4>
              <div>
                <RenderComments comments={props.comments}
                postComment={props.postComment}
                dishId={props.dish.id}/>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }


export default DishDetail;