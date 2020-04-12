import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalHeader, Label, Row} from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state="";
    };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };

  handleSubmit=(values)=>{
     this.toggleModal();
     this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)

}


  render() {
    return (
      <div>
        <Button outline color="secondary" type="submit" value="submit" onClick={this.toggleModal}>
          Submit Comment
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>

            <Row className="form-group m-1">
                <Label htmlFor="rating">Rating</Label>
                <Control.select model=".rating" name="rating" className="custom-select" >
                     <option>1</option>
                     <option>2</option>
                     <option>3</option>
                     <option>4</option>
                     <option>5</option>

                </Control.select>
            </Row>
            <Row className="form-group m-1">
                <Label htmlFor="author" >Your Name</Label>
                    <Control.text model=".author" id="author" name="author"
                        placeholder="Your Name"
                        className="form-control"
                        validators={{
                        minLength: minLength(3), maxLength: maxLength(15)
                        }}
                        />
                        <Errors
                            className="text-danger"
                            model=".author"
                            show="touched"
                            messages={{
                                minLength: 'Must be greater than 2 characters',
                                maxLength: 'Must be 15 characters or less'
                            }} />
            </Row>
            <Row className="form-group m-1">
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea model=".comment" id="comment" name="comment" 
                        rows="6"
                        className="form-control" />
            </Row>
            <Row className="form-group m-1" >
                <Button type="submit" color="primary">Submit</Button>
            </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default CommentForm;
