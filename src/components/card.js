import React from 'react'

export default (data) => {
  const card = data.card
  const game = data.game
  const cardClass = `card ${card.isCorrect && 'isCorrect'}`
  return (
    <div className={cardClass} onClick={() => game.openCard(card)}>
      {
        !card.isOpen ? <h4 className="text close">{card.type.toUpperCase()}</h4>
        : <h4 className="text open">{card.value}</h4>
      }
    </div>
  )
}