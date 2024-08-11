import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src":"/img/helmet-1.png",matched:false},
  {"src":"/img/potion-1.png",matched:false},
  {"src":"/img/ring-1.png",matched:false},
  {"src":"/img/scroll-1.png",matched:false},
  {"src":"/img/shield-1.png",matched:false},
  {"src":"/img/sword-1.png",matched:false}
]

function App() {
const [cards,setCards] = useState([]); 
const [turns,setTurns] = useState(0); 
const [choiseOne,setChoiseOne] = useState(null);
const [choiseTwo,setChoiseTwo] = useState(null);
const [disabled,setDisabled] = useState(false); 


//shuffle cards
const shuffleCards =()=>{
  const shuffledCards = [...cardImages,...cardImages]
  .sort(() => Math.random() - 0.5)
  .map((card) => ({...card, id : Math.random() }));
  setChoiseOne(null)
  setChoiseTwo(null)
  setCards(shuffledCards);
  setTurns(0);
}
//handle a choise
const handleChoise = (card) =>{
  choiseOne ? setChoiseTwo(card) : setChoiseOne(card)
}
//compare 2 selected cards
useEffect(()=>{
  
if(choiseOne && choiseTwo){
  setDisabled(true)
  if(choiseOne.src===choiseTwo.src){
    setCards(prevCards => {
      return prevCards.map(card => {
        if(card.src === choiseOne.src){
          return{...card, matched: true}
        }else {
          return{...card}
        }
      })
    })
    resetTurn();
  } else{
    
    setTimeout(()=>resetTurn(),1000);
  }
}
},[choiseOne,choiseTwo])

//start a new game automatically
useEffect(()=>{
shuffleCards()
},[])

const resetTurn = () =>{
  setChoiseOne(null);
  setChoiseTwo(null);
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false);
}
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard key={card.id} card={card}
           handleChoise={handleChoise}
           flipped={card === choiseOne || card === choiseTwo || card.matched}
           disabled={disabled}/>

        ))}
       
      </div>
      <h2>{turns}</h2>
    </div>
  );
}

export default App;
