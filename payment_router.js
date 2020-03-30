const Client = require('./network')

var Payment = function(options) {
    this.client = new Client(options)
    var that = this
    this.pay = function(PaymentAction) {
        return function(card_number, amount, pin) {
            return that.client.pay(card_number, amount, pin, PaymentAction)
        }
    }
}

module.exports = Payment