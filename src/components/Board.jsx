import React from "react";
import Card from "../components/Card";
import PropTypes from "prop-types";

export default function Board({
  cards,
  flipped,
  handleClick,
  disabled,
  solved,
}) {
  return (
    <div className="gameboard">
      {cards.map(({ id, height, width, type, back }) => (
        <Card
          key={id}
          id={id}
          type={type}
          width={width}
          height={height}
          back={back}
          flipped={flipped.includes(id)}
          handleClick={handleClick}
          disabled={disabled || solved.includes(id)}
          solved={solved.includes(id)}
        />
      ))}
    </div>
  );
}

Board.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  flipped: PropTypes.arrayOf(PropTypes.number).isRequired,
  solved: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
