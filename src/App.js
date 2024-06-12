import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./componets/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png", matched : false },
  { src: "/img/potion-1.png", matched : false },
  { src: "/img/ring-1.png", matched : false },
  { src: "/img/scroll-1.png", matched : false },
  { src: "/img/shield-1.png", matched : false },
  { src: "/img/sword-1.png", matched : false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  
  const shuffledCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5) // .sort 는 정렬
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  function handleChoice(card) {
    console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffledCards();
  }, []);
  
  return (
    <>
      <div className="App">
        <h1>Magic Match</h1>
        <button onClick={shuffledCards}>New Game</button>

        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard 
            handleChoice={handleChoice} 
            card={card} key={card.id} 
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
          ))}
        </div>
        <p>턴수 : {turns}</p>
      </div>
    </>
  );
}

export default App;
