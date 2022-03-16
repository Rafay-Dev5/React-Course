import React from "react";

//import { Media } from "reactstrap";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardBody,
  CardText,
  CardTitle,
} from "reactstrap";

function RenderMenuItem({ dish, onClick }) {
  return (
    <Card onClick={() => onClick(dish.id)}>
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardImgOverlay>
        <CardTitle>{dish.name}</CardTitle>
      </CardImgOverlay>
    </Card>
  );
}

function Menu(props) {
  const menu = props.dishes.map((dish) => {
    return (
      <div key={dish.id} className="col-12 col-md-5 m-1">
        {/* <Media tag="li">
            <Media left middle>
              <Media object src={dish.image} alt={dish.name} />
            </Media>
            <Media body className="ml-5">
              <Media heading={dish.name}></Media>
              <p>{dish.description}</p>
            </Media>
          </Media> */}
        <RenderMenuItem dish={dish} onClick={props.onClick} />
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">
        {/* <Media list>{menu}</Media> */}
        {menu}
      </div>
      {/* <div className="row">{this.renderDish(this.state.selectedDish)}</div> 
        <DishDetail selectedDish={this.state.selectedDish} />*/}
    </div>
  );
}

export default Menu;
