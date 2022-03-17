import React, { Component } from "react";
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import Header from "./HeaderComment";
import Footer from "./FooterComponent";
import { DISHES } from "../shared/dishes";
import Home from "./HomeComponent";
import { Routes, Route, Navigate } from "react-router-dom";
//import logo from "./logo.svg";
//import "./App.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null,
    };
  }

  onDishSelect(dishID) {
    this.setState({
      selectedDish: dishID,
    });
  }

  render() {
    const HomePage = () => {
      return <Home />;
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
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default Main;
