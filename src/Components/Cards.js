import React, { useState, Fragment } from "react";
import { Card, Button } from "react-bootstrap";
import { isWebpSupported } from "react-image-webp/dist/utils";
import cardsList from "../Components/CardsList.json";

export const Cards = () => {
  const [maxRange, setMaxRange] = useState(4);
  const [disabledBtn, setdisabledBtn] = useState(false);

  const loadMore = () => {
    setMaxRange((prevRange) => prevRange + 4);
    if (maxRange >= cardsList.length) {
      setdisabledBtn(true);
    }
  };
  const loadAll = () => {
    setMaxRange(cardsList.length);
    setdisabledBtn(true);
  };

  const addProductToCart = cardsList.map((card) => {
    return console.log(card.id);
  });

  const cardComponent = cardsList.slice(0, maxRange).map((card) => {
    return (
      <li className="cards__item">
        <Card variant="dark" key={card.id} style={{ width: "15rem" }}>
          {isWebpSupported() ? (
            <Card.Img
              src={process.env.PUBLIC_URL + `/Images/${card.srcWebp}`}
              alt="{card.title}"
              variant="top"
            />
          ) : (
            <Card.Img
              src={process.env.PUBLIC_URL + `/Images/${card.src}`}
              alt="{card.title}"
              variant="top"
            />
          )}
          <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>{card.price}</Card.Text>
            <Button variant="outline-primary" onClick={addProductToCart}>
              Buy
            </Button>
          </Card.Body>
        </Card>
      </li>
    );
  });

  return (
    <Fragment>
      <ul className="cards__list">{cardComponent}</ul>
      <div className="cards__btns d-flex justify-content-center">
        <Button
          className="btn-more"
          variant="primary"
          onClick={loadMore}
          disabled={disabledBtn}>
          See more
        </Button>
        <Button
          className="btn-more"
          variant="primary"
          onClick={loadAll}
          disabled={disabledBtn}>
          See All
        </Button>
      </div>
    </Fragment>
  );
};
