const Client = require('./network')

var Payment = function(options) {
    this.client = new Client(options)

    this.pay = function(PaymentAction) {
        const that = this
        return function(amount, card_number, pin) {
            return that.client.pay(card_number, amount, pin, PaymentAction)
        }
    }
}

module.exports = Payment