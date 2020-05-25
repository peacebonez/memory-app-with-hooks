import React from "react";

export default function Gameover({ gameOver }) {
  return (
    <div className="gameover" style={{ opacity: gameOver ? 1 : 0 }}>
      <h1>
        <span role="img">🍎 🎀</span> 𝒢𝒜𝑀𝐸🌞𝒱𝐸𝑅 𝒴🍬𝓊 𝒲𝒾𝓃❢{" "}
        <span role="img">🍎 🎀</span>
      </h1>
    </div>
  );
}
