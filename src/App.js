import React, { useState, useEffect } from "react";
import Heading from "./components/Heading";
import Board from "./components/Board";
import Gameover from "./components/Gameover";
import { initializeDeck } from "./deck";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setCards(initializeDeck());
  }, []);

  useEffect(() => {
    preloadImages();
  }, [cards]);

  useEffect(() => {
    if (solved.length === 16) handleGameOver();
  }, [solved]);

  const startGame = () => {
    setIsPlaying(true);
  };

  const timer = useEffect(() => {
    if (isPlaying) {
      let timer = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [time, isPlaying]);

  const resetGame = () => {
    resetCards();
    setSolved([]);
    setMoves(0);
    setTime(0);
    setIsPlaying(false);
    setGameOver(false);
    setCards(initializeDeck());
  };

  const handleGameOver = () => {
    setGameOver(true);
    setIsPlaying(false);
  };

  const handleClick = (id) => {
    if (!isPlaying) setIsPlaying(true);
    setDisabled(true);
    if (flipped.length === 0) {
      setFlipped([id]);
      setDisabled(false);
    } else {
      if (sameCardClicked(id)) return;
      setFlipped([...flipped, id]);
      setMoves((move) => move + 1);
      if (isMatch(id)) {
        setSolved([...solved, flipped[0], id]);
        resetCards();
      } else {
        setTimeout(resetCards, 1500);
      }
    }
  };

  const resetCards = () => {
    setFlipped([]);
    setDisabled(false);
  };

  //Is user clicking same card twice?
  const sameCardClicked = (id) => flipped.includes(id);

  const isMatch = (id) => {
    const justClicked = cards.find((card) => card.id === id);
    const alreadyFlipped = cards.find((card) => flipped[0] === card.id);
    return alreadyFlipped.type === justClicked.type;
  };

  const preloadImages = () => {
    cards.map((card) => {
      const src = card.type.front;
      new Image().src = src;
    });
  };

  console.log("solved:", solved);
  return (
    <div className="App">
      <Heading time={time} moves={moves} resetGame={resetGame} />
      <Board
        cards={cards}
        flipped={flipped}
        handleClick={handleClick}
        disabled={disabled}
        solved={solved}
      />
      {gameOver ? <Gameover gameOver={gameOver} /> : null}
    </div>
  );
}

export default App;
