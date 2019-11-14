class Card {
  constructor () {
    this.balance = 0
  }

  addMoney (value) {
    this.balance += value
  }

  showBalance() {
    retrun this.balance
  }
}
