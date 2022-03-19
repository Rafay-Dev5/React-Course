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

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onDishSelect(dishID) {
    this.setState({
      selectedDish: dishID,
    });
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured === true)[0]}
          promotion={
            this.props.promotions.filter((promo) => promo.featured === true)[0]
          }
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
            this.props.dishes.filter((dish) => dish.id === parseInt(dishId))[0]
          }
          comments={this.props.comments.filter(
            (comment) => comment.dishId === parseInt(dishId)
          )}
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
          <Route exact path="/contactus" element={<Contact />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
