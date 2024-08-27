import React, { useState } from "react";
import './App.css'
import axios from "axios";

function App() {
  const [betAmount, setBetAmount] = useState("");
  const [guess, setGuess] = useState(true);
  const [message, setMessage] = useState("");

  const flipCoin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/flip", {
        guess: guess,
        amount: betAmount,
      });
      if (response.data.success) {
        setMessage(`Success! Tx Hash: ${response.data.transactionHash}`);
      } else {
        setMessage("Failed to flip the coin.");
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="container">
      <h1>Coin Flip Game</h1>
      <input
        type="number"
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
        placeholder="Bet amount (ETH)"
      />
      <div>
        <label>
          <input
            type="radio"
            checked={guess === true}
            onChange={() => setGuess(true)}
          />
          Heads
        </label>
        <label>
          <input
            type="radio"
            checked={guess === false}
            onChange={() => setGuess(false)}
          />
          Tails
        </label>
      </div>
      <button onClick={flipCoin}>Flip Coin</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
