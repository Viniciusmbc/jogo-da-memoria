import "./SingleCard.css"

export const SingleCard = ({card, handleChoice}) => {
    
 // O click na parte de trás das cartas iráe xecutar a função handleChoice, que está sendo passada como prop nesse componente, pois essa função está declarada lá no App.js
    const handleClick = () => {
        handleChoice(card)
    }


    return (       
    <div className ="card">
         <div>
         <img className="front"src={card.src} alt="card front"/>  
         <img className="back" src="/img/cover.png" onClick={handleClick}alt="card back"/>
         </div>
    </div>
    )
}
