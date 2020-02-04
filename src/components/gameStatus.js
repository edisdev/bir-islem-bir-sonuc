import React from 'react'

export default ({ timer, status, success }) => {
  let isStart = status === 'started'
  let isFinished = status === 'finished'
  let finishedMessage = null
  if (isFinished && success) {
    finishedMessage = `Oyunu ${timer} sürede başarılı şekilde tamamladınız 🥳`
  } else if (isFinished && !success){
    finishedMessage = `Üzgünüz, oyunu tamamlayamadan bitirdiniz 🥺`
  }
  return (
    <div className="gameContent">
      {
        isStart &&
        <div className="gameContentTime">Süre: {timer} saniye</div>
      }
      { finishedMessage &&
        <div>{finishedMessage}</div>
      }
    </div>
  )
}