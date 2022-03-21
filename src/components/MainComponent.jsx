import React, { Component } from "react";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishDetailComponent";
import Header from "./HeaderComment";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import About from "./AboutComponent";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
//import logo from "./logo.svg";
//import "./App.css";
import { withRouter } from "../redux/withRouter";
import { connect } from "react-redux";
import {
  postComment,
  fetchComments,
  fetchDishes,
  fetchPromos,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
  fetchComments: () => {
    dispatch(fetchComments());
  },
  fetchPromos: () => {
    dispatch(fetchPromos());
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      props: props,
    };
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    console.log("Fetching: " + this.state.props.fetchDishes());
    console.log("Dishes Array: " + this.state.props.dishes);
    console.log(this.state);
    console.log(this.state.props.leaders);
  }

  onDishSelect(dishID) {
    this.setState({
      selectedDish: dishID,
    });
  }

  render() {
    const HomePage = () => {
      console.log("Props: " + this.state.props);
      console.log("Dishes: " + this.state.props.dishes.dishes);
      return (
        <Home
          dish={
            this.props.dishes.dishes.filter((dish) => dish.featured === true)[0]
          }
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured === true
            )[0]
          }
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={
            this.props.leaders.filter((leader) => leader.featured === true)[0]
          }
        />
      );
    };

    //Params has match,location,history
    const DishWithId = () => {
      const { dishId } = useParams();
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(dishId)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === parseInt(dishId)
          )}
          postComment={this.props.postComment}
          commentsErrMess={this.props.comments.errMess}
        />
      );
    };
    return (
      <div className="App">
        <Header />
        <Routes>
          {/* <Menu
          dishes={this.props.dishes}
          onClick={(dishID) => this.onDishSelect(dishID)}
        />
        <DishDetail
          dish={
            this.props.dishes.filter(
              (dish) => dish.id === this.props.selectedDish
            )[0]
          }
        /> */}
          <Route path="/home" element={<HomePage />} />
          <Route
            exact
            path="/menu"
            element={
              <Menu
                dishes={this.props.dishes}
                onClick={(dishID) => this.onDishSelect(dishID)}
              />
            }
          />
          <Route exact path="menu/:dishId" element={<DishWithId />} />
          <Route
            exact
            path="/aboutus"
            element={<About leaders={this.props.leaders} />}
          />
          <Route
            exact
            path="/contactus"
            element={
              <Contact resetFeedbackForm={this.state.props.resetFeedbackForm} />
            }
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
