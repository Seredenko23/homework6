class Atm {
  constructor (atmWrapper) {
    this.atmWrapper = atmWrapper,
    this.currentCard,
    this.controlElements = {
      options: atmWrapper.getElementsByClassName('options-js')[0],
      add: atmWrapper.getElementsByClassName('add-js')[1],
      transfer: atmWrapper.getElementsByClassName('add-js')[0],
      withdraw: atmWrapper.getElementsByClassName('withdraw-js')[0],
      choose: atmWrapper.getElementsByClassName('choose-js')[0]
    }
    this.info = atmWrapper.getElementsByClassName('atm-info-js')[0],
    this.total = atmWrapper.getElementsByClassName('total-js')[0],
    this._balance = 0,
    this._tempBalance = 0,
    this._tempBills = [],
    this._values = {
      1000: 0,
      500: 0,
      200: 0,
      100: 0,
      50: 0
    }
  }

  showBalance () {
    return {
      balance: this._balance,
      bills: this._values
    }
  }

  setCard (card) {
    this.currentCard = card
  }

  addMoney (value, bills) {
    if (value !== this.billsSum(bills)) {
      this.info.textContent = 'Сума не співпадає з кількістю купюр!'
    } else {
      this._balance += value
      bills.forEach((el) => {
        this._values[el] += 1
      })
      this._tempBalance = 0
      this._tempBills = []
      this.total.textContent = 0
      this.info.textContent = 'Гроші успішно додані до банкомату!'
      this.hideExcept('options')
    }
  }

  billsSum (bills) {
    return bills.reduce((acc, cur) => { return acc + cur })
  }

  withdrawCash (card, value) {
    if (value > this._balance) {
      this.info.textContent = 'В банкоматі не вистачає грошей!'
    } else {
      let temp = value
      const bills = {}
      const keys = Object.keys(this._values).reverse()
      keys.forEach((el) => {
        const amountOfBill = Math.floor(temp / el) <= this._values[el]
          ? Math.floor(temp / el) : this._values[el]
        bills[el] = amountOfBill
        temp -= el * amountOfBill
      })
      if (!temp) {
        keys.forEach((el) => {
          this._values[el] -= bills[el]
        })
        this._balance -= value
        card.addMoney(value)
        this.info.textContent = 'Гроші успішно перераховані на вашу карту'
        this.hideExcept('options')
      } else {
        this.info.textContent = 'Не вистачає купюр!'
      }
    }
  }

  transferHandler (event) {
    const target = event.target
    if (target.dataset.type === 'transfer') {
      this.addMoney(this._tempBalance, this._tempBills)
    }
  }

  addHandler (event) {
    const target = event.target
    if (target.dataset.values) {
      this._tempBalance += +target.dataset.values
      this._tempBills.push(+target.dataset.values)
      this.total.textContent = this._tempBalance
    }
  }

  withdrawHandler (event) {
    const target = event.target
    if (target.dataset.type === 'withdraw') {
      const input = atmWrapper.getElementsByClassName('withdraw-input')[0]
      this.withdrawCash(this.currentCard, input.value)
    }
  }

  toMain () {
    this.info.textContent = 'Оберіть дію'
    this.total.textContent = 0
    this._tempBalance = 0
    this._tempBills = []
    this.hideExcept('options')
  }

  optionHandler (event) {
    const target = event.target
    this.hideExcept(target.dataset.type)
    switch (target.dataset.type) {
      case 'add':
        this.info.textContent = 'Скільки грошей бажаете додати?'
        break
      case 'withdraw':
        if (this.currentCard) {
          this.info.textContent = 'Яку сумму хочете зняти?'
        } else {
          this.info.textContent = 'Спочатку оберіть карту!'
          this.hideExcept('')
        }
        break
      case 'balance':
        this.info.textContent = `На рахунку ${this._balance} банкомата!`
        break
      case 'card':
        if (this.currentCard) {
          this.info.textContent = `На рахунку ${this.currentCard.showBalance()}`
        } else {
          this.info.textContent = 'Спочатку оберіть карту!'
        }
        break
      case 'choose':
        this.info.textContent = 'Оберіть карту'
        break
      default:
        this.hideExcept('options')
        break
    }
  }

  hideExcept (elem) {
    const elements = Object.values(this.controlElements)
    elements.forEach((el) => {
      if (el.classList.contains(elem + '-js')) {
        el.style.display = 'flex'
      } else {
        el.style.display = 'none'
      }
    })
  }

  initEvents () {
    const main = atmWrapper.getElementsByClassName('main-js')[0]
    const withdraw = atmWrapper.getElementsByClassName('withdraw-js')[0]
    const add = atmWrapper.getElementsByClassName('add-js')[1]
    this.controlElements.options.addEventListener('click', this.optionHandler.bind(this))
    this.controlElements.transfer.addEventListener('click', this.transferHandler.bind(this))
    main.addEventListener('click', this.toMain.bind(this))
    withdraw.addEventListener('click', this.withdrawHandler.bind(this))
    add.addEventListener('click', this.addHandler.bind(this))
  }
}
