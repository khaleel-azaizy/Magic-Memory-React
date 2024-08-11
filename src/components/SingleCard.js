import './SingleCard.css'
const SingleCard = (props) =>{
    const card = props.card;
    const disabled = props.disabled;
    const flipped = props.flipped;
    const handleChoise = props.handleChoise;
    const handleClick = () =>{
        if(!disabled){
         handleChoise(card)
        }
    }
    return(
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
              <img className="front" src={card.src}/>
              <img className="back" src="/img/cover.png" onClick={handleClick} alt="card back"/>
            </div>
          </div>
    )
}
export default SingleCard;