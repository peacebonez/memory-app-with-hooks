import React from "react";
import PropTypes from "prop-types";

export default function Card({
  handleClick,
  id,
  flipped,
  back,
  height,
  width,
  type,
  disabled,
  solved,
}) {
  return (
    <div
      className={`card flip-container ${flipped ? "flipped" : ""}`}
      onClick={() => (disabled ? null : handleClick(id))}
    >
      <div className="flipper">
        <img
          style={{ height, width }}
          className={flipped ? "front" : "back"}
          alt={type.alt}
          src={flipped || solved ? type.front : back}
        />
      </div>
    </div>
  );
}

Card.propTypes = {
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  flipped: PropTypes.bool.isRequired,
  solved: PropTypes.bool.isRequired,
  back: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
};
