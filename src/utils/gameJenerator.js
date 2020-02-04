export default class Game {
  constructor(cardCount = 10, minNumber = 1, maxNumber = 100) {
    Object.assign(this, {
      cardCount: cardCount / 2,
      operators: ['+', '-', 'x', ':'],
      questions: [],
      results: [],
      minNumber,
      maxNumber,
      mixedData: new Array(cardCount),
      successed: false,
      isFinished: false,
      isStart: false
    })
  }

  randomNumber (min = this.minNumber, max = this.maxNumber) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  getUniqueIndex (array, count = (this.cardCount * 2)) {
    let index = this.randomNumber(0, count)
    if (array[index] !== undefined) index = this.getUniqueIndex(array, count)
    return index
  }

  operations (operator, number1, number2) {
    switch (operator) {
      case '+' : return number1 + number2
      case '-' : return number1 - number2
      case 'x' : return number1 * number2
      case ':' : return Number((number1 / number2).toFixed(2))
      default:
        break;
    }
  }

  setStart(start) {
    this.isStart = start
  }

  start() {
    this.setStart(!this.isStart)
    this.isFinished = false
    this.successed = false
  }

  finish () {  
    this.questions = []
    this.results = []
    this.mixedData = new Array(this.cardCount)
    this.isFinished = true
    this.setStart(false)
  }

  successControl () {
     let succesCards = this.mixedData.filter(_ => _.isCorrect)
    if (succesCards.length === this.mixedData.length) {
      this.successed = true
      this.finish()
    }
  }

  setCardsStatus (opendedCards) {
    let result1 = opendedCards[0].result ? opendedCards[0].result :  opendedCards[0].value
    let result2 = opendedCards[1].result ? opendedCards[1].result :  opendedCards[1].value
    if (result1 === result2) {
      opendedCards[0].isCorrect = true
      opendedCards[1].isCorrect = true
    } else {
      opendedCards[0].isOpen = false
      opendedCards[1].isOpen = false
    }

    this.successControl()
  }

  openCard (card) {
    card.isOpen = true
    const opendedCards = this.mixedData.filter(_ => _.isOpen && !_.isCorrect)
    if (opendedCards.length === 2) {
      setTimeout(() => this.setCardsStatus(opendedCards), 1000)
    }
  }

  initQuestions() {
    for(let index = 0; index <= this.cardCount - 1; index ++) {
      let operator = this.operators[this.randomNumber(0, 4)]
      let firstNumber = this.randomNumber()
      let secoundNumber = this.randomNumber()
      let question = `${firstNumber} ${operator} ${secoundNumber}`
      let result = this.operations(operator, firstNumber, secoundNumber)
      this.questions.push({
        value: question,
        type: 'q',
        result
      })
      this.results.push({
        value: result,
        type: 'r',
        result: false
      })
    }
    let mixedData = [...this.questions, ...this.results]
    mixedData.forEach(data => {
      let index = this.getUniqueIndex(this.mixedData)
      this.mixedData[index] = {
        ...data,
        isOpen: false,
        isCorrect: false
      }
    })
  }
}