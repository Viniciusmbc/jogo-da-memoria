import './App.css'
import { useState, useEffect } from 'react'
import { SingleCard } from './components/SingleCard';


// Esta const vai ser criada aqui pois não muda ao longo do jogo: as cartas são sempre as mesmas!

const cardImages =[
  {"src" : "/img/helmet-1.png", matched: false},
  {"src" : "/img/potion-1.png", matched: false},
  {"src" : "/img/ring-1.png", matched: false},
  {"src" : "/img/scroll-1.png", matched: false},
  {"src" : "/img/shield-1.png", matched: false},
  {"src" : "/img/sword-1.png", matched: false}
]


function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

// Função para misturar as cartas:
// 1º: duplicar as cartas que estão no array cardImages;
// 2º: utilizar a função sort para misturar as cartas entre si;
// 3º: criar um objeto com id aleatório para cada carta utilizando a função map.

const shuffleCards = () => {

  const shuffleCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5).map((card) => ({...card, id: Math.random()}) )

  setChoiceOne(null);
  setChoiceTwo(null);
  setCards(shuffleCards);
  setTurns(0);
}

// Escolha das cartas:

const handleChoice = (card) => {

// Se a opção um já foi escolhida (!== null), significa que a segunda opção de carta ainda não foi e deverá ser a próxima (setChoiceTwo).

  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  
}

// Comparar as duas cartas e exibir no console:

useEffect(() => {

  if(choiceOne && choiceTwo){
    setDisabled(true);
    if(choiceOne.src === choiceTwo.src){
      setCards(prevCards => {
        return prevCards.map(card => {
          if(card.src === choiceOne.src){
            return {...card, matched: true}
          } else {
            return card
          }
        })
      })
      return resetTurn();
    } else {
      setTimeout(() => resetTurn(), 1000);
    }
  }
}, [choiceOne, choiceTwo])

console.log(cards);

// Resetar as escolhas feitas e incrementar um turno:

const resetTurn = () => {
  setChoiceOne(null);
  setChoiceTwo(null);
  setTurns(prevTurns => prevTurns + 1);
  setDisabled(false)
}

// Para começar um jogo com os dados resetados, é necessário utilizar o useEffect, pois, para que na primeira vez que o jogo renderizar seja passado os valores originais para os estados (ChoiceOne, ChoiceTwo):

useEffect(() => {
   shuffleCards()     
}, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

    <div className="card-grid">
      {cards.map(card => (<SingleCard 
      card={card} 
      handleChoice={handleChoice}
      key={card.id}
      flipped={card === choiceOne || card === choiceTwo || card.matched}
      disabled={disabled}
      />))}
    </div>
  <div>Turns: {turns}</div>
  </div>
  );
}

export default App