import React from "react";
import "./SingleCard.css";

const SingleCard = ({card, handleChoice, flipped, disabled}) => {
  const handleClick = () => {
    if(!disabled) 
      handleChoice(card); // if구문이 실행할 함수가 하나이므로 {} 생략 가능!!
  }
  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img className="front" src={card.src} alt="card front"></img>
        <img onClick={handleClick} className="back" src="/img/cover.png" alt="card back"></img>
      </div>
    </div>
  );
};

export default SingleCard;
