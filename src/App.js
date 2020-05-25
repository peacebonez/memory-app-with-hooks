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

  //sets cards as a shuffled array of cards
  useEffect(() => {
    setCards(initializeDeck());
  }, []);

  //preloads the images to the game before the cards are flipped
  useEffect(() => {
    preloadImages();
  }, [cards]);

  //handles game over state
  useEffect(() => {
    if (solved.length === 16) handleGameOver();
  }, [solved]);

  //sets game state to playing
  const startGame = () => {
    setIsPlaying(true);
  };

  //increments game timer
  const timer = useEffect(() => {
    if (isPlaying) {
      let timer = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [time, isPlaying]);

  //resets state of game to init
  const resetGame = () => {
    resetCards();
    setSolved([]);
    setMoves(0);
    setTime(0);
    setIsPlaying(false);
    setGameOver(false);
    setCards(initializeDeck());
  };

  //handles game over.... derrrrr
  const handleGameOver = () => {
    setGameOver(true);
    setIsPlaying(false);
  };

  //executes when a card is clicked
  const handleClick = (id) => {
    if (!isPlaying) setIsPlaying(true); //if game not started, start game on first click
    setDisabled(true);
    if (flipped.length === 0) {
      setFlipped([id]);
      setDisabled(false);
    } else {
      if (sameCardClicked(id)) return; //prevents clicking on same card twice
      setFlipped([...flipped, id]); //array of flipped cards max length is 2
      setMoves((move) => move + 1); //increments a move per pair of cards flipped
      if (isMatch(id)) {
        setSolved([...solved, flipped[0], id]); //if match, add card Id's to solved arr
        resetCards();
      } else {
        setTimeout(resetCards, 1500); // timeout flips card back over if no match
      }
    }
  };

  const resetCards = () => {
    setFlipped([]);
    setDisabled(false);
  };

  //Is user clicking same card twice boolean
  const sameCardClicked = (id) => flipped.includes(id);

  //determines if card pair is a match
  const isMatch = (id) => {
    //matches just clicked card to in cards array
    const justClicked = cards.find((card) => card.id === id);

    //flipped[0] is the 1st of the 2 cards in the pair to be flipped
    const alreadyFlipped = cards.find((card) => flipped[0] === card.id);

    //determines if a match is made
    return alreadyFlipped.type === justClicked.type;
  };

  //preloads the images to the game before the cards are flipped
  const preloadImages = () => {
    cards.map((card) => {
      const src = card.type.front;
      new Image().src = src;
    });
  };

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
