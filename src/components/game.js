import React, { useState, useEffect } from 'react'

import "../stylesheets/game.scss"

import Cards from './cards'
import GameStatus from './gameStatus'
import Game from '../utils/gameJenerator'
import GameContext from '../utils/gameContext'


export default () => {
  const [game] = useState(new Game())
  const [timer, setTimer] = useState(0)
  const [cards, setCards] = useState([])
  
  const gameControl = () => {
    let gameInterval = null
    if (game.isStart) {
    gameInterval = setTimeout(() => setTimer(timer + 1), 1000);
    } else {
      clearTimeout(gameInterval)
    }
  }

  useEffect(() => {
    if(game.isFinished) {
      game.setStart(false)
      setCards(game.mixedData)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.isFinished])

  useEffect(() => {
    gameControl()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.isStart, timer])

  function toggleGame () {
    game.setStart(!game.isStart)
    if (game.isStart) {
      setTimer(0)
      game.initQuestions()
    } else {
      game.finish()
    }
    setCards(game.mixedData)
  }

  const actionButton =  {
    class: `btn ${game.isStart ? 'btn-orange': 'btn-green'}`,
    text: `${game.isStart ? 'Oyunu Bitir' : 'Oyuna Başla'}`
  }

  const gameStatus = () => {
    if (game.isStart) return 'started'
    else if (game.isFinished) return 'finished'
    else return null
  }


  return (
    <GameContext.Provider value={{ game, cards }}>
      <div className="game">
        <h1 className="gameName">Bir İşlem - Bir Cevap</h1>
        <button
          type="button"
          className={actionButton.class}
          onClick={() => toggleGame()}>
          {actionButton.text}
        </button>
        <GameStatus timer={timer} status={gameStatus()} success={game.successed}/>
        {game.isStart && !game.isFinished ?
          <Cards />
          :
          <div className="gameDescription">
            <p>Oyun başladığında gelecek olan kartların her birinde bir adet işlem veya sonuç gizlidir.</p>
            <span aria-label='img' role='img'>Yapmanız gereken şey, doğru işlem ve sonucu eşletirmek 🤘</span>
            <div className="shorten">
              <span><b>Q:</b> İşlem</span>
              <span><b>R:</b> Sonuç</span>
            </div>
          </div>
        }
      </div>
    </GameContext.Provider>
  );
}