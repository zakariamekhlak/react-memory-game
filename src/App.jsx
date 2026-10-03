import { useState } from "react";
import "./App.css";

const cards = [
  "🍎", "🍌", "🍇", "🍉",
  "🍎", "🍌", "🍇", "🍉"
];

function App() {
  const [gameCards, setGameCards] = useState(shuffleCards());
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  function shuffleCards() {
    return [...cards]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji: emoji
      }));
  }

  function handleClick(card) {
    // Ila card deja ma9loba
    if (
      flipped.includes(card.id) ||
      matched.includes(card.id) ||
      flipped.length === 2
    ) {
      return;
    }

    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    // Ila 9lbna jouj cards
    if (newFlipped.length === 2) {
      setMoves(moves + 1);

      const firstCard = gameCards.find(
        (item) => item.id === newFlipped[0]
      );

      const secondCard = gameCards.find(
        (item) => item.id === newFlipped[1]
      );

      if (firstCard.emoji === secondCard.emoji) {
        setMatched([
          ...matched,
          firstCard.id,
          secondCard.id
        ]);

        setFlipped([]);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  }

  function restartGame() {
    setGameCards(shuffleCards());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  }

  return (
    <div className="game">

      <h1>🧠 Memory Game</h1>

      <p className="moves">
        Moves: {moves}
      </p>

      <div className="cards">
        {gameCards.map((card) => (
          <div
            key={card.id}
            className={
              "card " +
              (flipped.includes(card.id) ||
              matched.includes(card.id)
                ? "flipped"
                : "")
            }
            onClick={() => handleClick(card)}
          >
            {flipped.includes(card.id) ||
            matched.includes(card.id)
              ? card.emoji
              : "❓"}
          </div>
        ))}
      </div>

      {matched.length === cards.length && (
        <div className="winner">
          🎉 You Win!
        </div>
      )}

      <button onClick={restartGame}>
        🔄 Restart Game
      </button>

    </div>
  );
}

export default App;