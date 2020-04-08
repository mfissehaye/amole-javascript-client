const Client = require('./network')

var Payment = function(options) {
    this.client = new Client(options)
    var that = this
    this.pay = function(payment_action) {
        return function(card_number, amount, pin) {
            return that.client.pay(card_number, amount, pin, payment_action)
        }
    }
}

module.exports = Payment