class Atm {
  constructor () {
    this.balance = 0,
    this.values = {
      1000: 0,
      500: 0,
      200: 0,
      100: 0,
      50: 0
    }
  }

  getBalance() {
    return this.balance;
  }

  addMoney (value, bills) {
    if (value !== this.billsSum(bills)) {
      console.log('NO!')
    } else {
      this.balance += value
      bills.forEach((el) => {
        this.values[el] += 1
      })
    }
  }

  billsSum (bills) {
    return bills.reduce((acc, cur) => { return acc + cur })
  }

  withdrawCash(card, value) {
    if(value > this.balance) {
      console.log('There is no enough money!')
    } else {
      let temp = value;
      let keys = Object.keys(this.values).reverse()
      keys.forEach((el) => {
        let amountOfBill = Math.floor(temp / el) <= this.values[el] !
        Math.floor(temp / el) ? this.values[el];
        this.values[el] -= amountOfBill;
        temp -= el * amountOfBill;
      })
      this.balance -= value;
      card.addMoney(value);
    }
  }
}
