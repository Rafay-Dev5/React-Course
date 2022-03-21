import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardBody,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

function CommentForm(props) {
  return (
    <Button outline onClick={props.toggleModal}>
      <span className="fa fa fa-pencil">Submit Comment</span>
    </Button>
  );
}

function RenderDish({ dish }) {
  console.log("Dish");
  return (
    <Card>
      <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments({ comments, toggleModal, postComment, dishId }) {
  console.log("Comments");
  if (comments != null) {
    return (
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {comments.map((comment) => {
            return (
              <div key={comment.id}>
                {comment.comment}
                <h6>
                  --{comment.author},{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(comment.date)))}
                </h6>
              </div>
            );
          })}
        </ul>
        <CommentForm
          toggleModal={toggleModal}
          dishId={dishId}
          postComment={postComment}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
}
const required = (values) => values && values.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      props: props,
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    // this.required = this.required.bind(this);
    // this.maxLength = this.maxLength.bind(this);
    // this.minLength = this.minLength.bind(this);
  }

  handleLogin(values) {
    this.toggleModal();
    if (!values.rating) {
      const copyValues = Object.create(values);
      //Copy
      this.state.props.postComment(
        this.state.props.dish.id,
        copyValues.rating,
        copyValues.author,
        copyValues.comment
      );
      return;
    }

    console.log(values);

    console.log("Hello");
    console.log(values.rating);
    console.log(this.state.props.dish.id);
    //console.log("Current State: " + JSON.stringify(values))
    //alert("Current State: " + JSON.stringify(values))
    this.state.props.postComment(
      this.state.props.dish.id,
      values.rating,
      values.author,
      values.comment
    );
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    console.log("Details");
    let selectedDish = this.state.props.dish;
    let displayComments = this.state.props.comments;
    if (this.state.props.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.state.props.errMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{this.state.props.errMess}</h4>
          </div>
        </div>
      );
    } else if (selectedDish != null) {
      return (
        <div className="container">
          <div className="row">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/menu">Menu</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>{selectedDish.name}</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                <h3>{selectedDish.name}</h3>
                <hr />
              </div>
            </div>
            <div className="col-12 col-md-5 m-1">
              <RenderDish dish={selectedDish} />
            </div>
            <div className="col-12 col-md-5 m-1">
              <RenderComments
                comments={displayComments}
                toggleModal={this.toggleModal}
                postComment={this.state.props.postComment}
                dishId={this.state.props.dish.id}
              />
            </div>
          </div>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleLogin(values)}>
                <Row className="form-group">
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select
                    model=".rating"
                    id="rating"
                    name="rating"
                    className="form-control"
                    // innerRef={(input) => (this.username = input)}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Row>
                <Row>
                  <Label htmlFor="author">Your Name</Label>
                  <Control.text
                    //type="author"
                    id="author"
                    name="author"
                    model=".author"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                    // innerRef={(input) => (this.password = input)}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than or equal to 3 letters",
                      maxLength: "Must be lesser than or equal to 15 letters",
                    }}
                  />
                </Row>
                <Row>
                  <Label htmlFor="comment">Comment</Label>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    // innerRef={(input) => (this.password = input)}
                  />
                </Row>
                <Button type="submit" value="submit" className="bg-primary">
                  Submit
                </Button>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
export default DishDetail;
