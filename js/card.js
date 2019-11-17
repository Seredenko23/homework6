class Card {
  constructor (name) {
  	this.name = name
    this.balance = 0
  }

  addMoney (value) {
    this.balance += +value
  }

  showBalance () {
    return this.balance
  }
}
