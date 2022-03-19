import React, { Component } from "react";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishDetailComponent";
import Header from "./HeaderComment";
import Footer from "./FooterComponent";
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";
import Home from "./HomeComponent";
import About from "./AboutComponent";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
//import logo from "./logo.svg";
//import "./App.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
    };
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
          dish={this.state.dishes.filter((dish) => dish.featured === true)[0]}
          promotion={
            this.state.promotions.filter((promo) => promo.featured === true)[0]
          }
          leader={
            this.state.leaders.filter((leader) => leader.featured === true)[0]
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
            this.state.dishes.filter((dish) => dish.id === parseInt(dishId))[0]
          }
          comments={this.state.comments.filter(
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
          dishes={this.state.dishes}
          onClick={(dishID) => this.onDishSelect(dishID)}
        />
        <DishDetail
          dish={
            this.state.dishes.filter(
              (dish) => dish.id === this.state.selectedDish
            )[0]
          }
        /> */}
          <Route path="/home" element={<HomePage />} />
          <Route
            exact
            path="/menu"
            element={
              <Menu
                dishes={this.state.dishes}
                onClick={(dishID) => this.onDishSelect(dishID)}
              />
            }
          />
          <Route exact path="menu/:dishId" element={<DishWithId />} />
          <Route
            exact
            path="/aboutus"
            element={<About leaders={this.state.leaders} />}
          />
          <Route exact path="/contactus" element={<Contact />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default Main;
