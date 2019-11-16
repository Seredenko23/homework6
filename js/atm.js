class Atm {
  constructor (atmWrapper) {
    this.atmWrapper = atmWrapper,
    this.controlElements = {
      options: atmWrapper.getElementsByClassName('options-js')[0],
      add: atmWrapper.getElementsByClassName('add-js')[0],
      total: atmWrapper.getElementsByClassName('add-js')[1],
      withdraw: atmWrapper.getElementsByClassName('withdraw-js')[0]
    }
    this.info = atmWrapper.getElementsByClassName('atm-info-js')[0],
    this.balance = 0,
    this.tempBalance = 0,
    this.values = {
      1000: 0,
      500: 0,
      200: 0,
      100: 0,
      50: 0
    }
  }

  showBalance () {
    return {
      balance: this.balance,
      bills: this.values
    }
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

  withdrawCash (card, value) {
    if (value > this.balance) {
      this.info.textContent = 'В банкоматі не вистачає грошей!'
    } else {
      let temp = value
      const bills = {}
      const keys = Object.keys(this.values).reverse()
      keys.forEach((el) => {
        const amountOfBill = Math.floor(temp / el) <= this.values[el]
          ? Math.floor(temp / el) : this.values[el]
        bills[el] = amountOfBill
        temp -= el * amountOfBill
      })
      if (!temp) {
        keys.forEach((el) => {
          this.values[el] = -bills[el]
        })
        this.balance -= value
        card.addMoney(value)
        this.info.textContent = 'Гроші успішно перераховані на вашу карту'
        this.hideExcept('options')
      } else {
        this.info.textContent = 'Не вистачає купюр!'
      }
    }
  }

  addHandler (event) {
    const target = event.target
    if (target.dataset.values) {
      const total = atmWrapper.getElementsByClassName('total')[0]
      this.tempBalance += +target.dataset.values
      total.textContent = this.tempBalance
    }
  }

  withdrawHandler (event) {
    const target = event.target
    if (target.dataset.type === 'withdraw') {
      const input = atmWrapper.getElementsByClassName('withdraw-input')[0]
      this.withdrawCash(card, input.value)
    }
  }

  toMain () {
    this.info.textContent = 'Оберіть дію'
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
        this.info.textContent = 'Яку сумму хочете зняти?'
        break
      case 'balance':
        this.info.textContent = `На рахунку ${this.balance}`
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
    main.addEventListener('click', this.toMain.bind(this))
    withdraw.addEventListener('click', this.withdrawHandler.bind(this))
    add.addEventListener('click', this.addHandler.bind(this))
  }
}
