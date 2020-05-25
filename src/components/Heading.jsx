import React from "react";
import { FaRedo } from "react-icons/fa";

export default function Heading({ time, moves, resetGame }) {
  const timeFormat = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${
      remainderSeconds < 10 ? "0" : ""
    }${remainderSeconds}`;
    return display;
  };
  return (
    <div className="heading">
      <h1>Ｍｅｍｏｒｙ░Ｍａｔｃｈ　（ュホヽ）</h1>
      <div className="scoreboard">
        <h4>Timer {timeFormat(time)}</h4>
        <h4>Moves: {moves}</h4>
        <button onClick={resetGame}>
          <FaRedo />
        </button>
      </div>
    </div>
  );
}
