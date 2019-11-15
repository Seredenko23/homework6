class Card {
  constructor () {
    this.balance = 0
  }

  addMoney (value) {
    this.balance += value
  }

  showBalance () {
    return this.balance
  }
}
