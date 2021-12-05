import "./SingleCard.css"

export const SingleCard = ({card, handleChoice, flipped, disabled}) => {
    
 // O click na parte de trás das cartas irá executar a função handleChoice, que está sendo passada como prop nesse componente, pois essa função está declarada lá no App.js

    const handleClick = () => {
        if(!disabled){
        handleChoice(card)
        }
    }


    return (       
    <div className ="card">
         <div className={flipped ? "flipped" : ""}>
         <img className="front"src={card.src} alt="card front"/>  
         <img className="back" src="/img/cover.png" onClick={handleClick}alt="card back"/>
         </div>
    </div>
    )
}
