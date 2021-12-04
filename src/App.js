import './App.css'
import { useState, useEffect } from 'react'
import { SingleCard } from './components/SingleCard';


// Esta const vai ser criada aqui pois não muda ao longo do jogo: as cartas são sempre as mesmas!

const cardImages =[
  {"src" : "/img/helmet-1.png"},
  {"src" : "/img/potion-1.png"},
  {"src" : "/img/ring-1.png"},
  {"src" : "/img/scroll-1.png"},
  {"src" : "/img/shield-1.png"},
  {"src" : "/img/sword-1.png"}
]


function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

// Função para misturar as cartas:
// 1º: duplicar as cartas que estão no array cardImages;
// 2º: utilizar a função sort para misturar as cartas entre si;
// 3º: criar um objeto com id aleatório para cada carta utilizando a função map.

const shuffleCards = () => {

  const shuffleCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5).map((card) => ({...card, id: Math.random()}) )

  setCards(shuffleCards);
  setTurns(0);
}

// Escolha das cartas:

const handleChoice = (card) => {

// Se a opção um já foi escolhida (!== null), significa que a segunda opção de carta ainda não foi e deverá ser a próxima (setChoiceTwo).

  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  
}

useEffect(() => {

  if(choiceOne){
    if(choiceTwo){
    const {src: src1} = choiceOne;
    console.log(src1)
    const {src: src2} = choiceTwo;
    console.log(src2)
    if(src1 === src2){
       console.log(`the cards are equal`)
      return resetTurn();
    } else {
      console.log(`The cards are different!`)
      return  resetTurn();
    }

   
  }}
}, [choiceOne, choiceTwo])

// Comparar as duas cartas e exibir no console:


// Resetar as escolhas feitas e incrementar um turno:

const resetTurn = () => {
  setChoiceOne(null);
  setChoiceTwo(null);
  setTurns(prevTurns => prevTurns + 1);
}


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

    <div className="card-grid">
      {cards.map(card => (<SingleCard card={card} 
      handleChoice={handleChoice}
      key={card.id}/>))}
    </div>
  
  </div>
  );
}

export default App