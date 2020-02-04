import React from 'react';
import GameContext from '../utils/gameContext'
//
import "../stylesheets/card.scss";
//
import Card from './card'

export default () => (
  <div className="cards">
    <GameContext.Consumer>
      {data => {
        return data.cards.map((card, index) => <Card key={index} game={data.game} card={card}/>)
      }}
    </GameContext.Consumer>
  </div>
);