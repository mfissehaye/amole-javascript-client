const Service = require('./service_router')
const Payment = require('./payment_router')

module.exports = function(options) {
    var service_client = new Service(options)
    var payment_client = new Payment(options)

    // this.get_account = this.service_client.get_account
    // this.get_customer = this.service_client.get_customer
    // this.add_customer= this.service_client.add_customer
    this.send_otp = service_client.send_otp
    // this.account_transfer= this.service_client.account_transfer
    // this.check_balance= this.service_client.check_balance
    // this.customer_transfer= this.service_client.customer_transfer
    // this.get_transactions= this.service_client.get_transactions
    // this.reverse_transaction= this.service_client.reverse_transaction
    // this.send_sms= this.service_client.send_sms
    // this.update_customer= this.service_client.update_customer
    // this.validate_card= this.service_client.validate_card
    // this.verify_otp= this.service_client.verify_otp

    this.sale = payment_client.pay('01')
    // this.deposit= this.payment_client.pay('02')
    // this.refund= this.payment_client.pay('03')
    // this.cash_sale= this.payment_client.pay('04')
    // this.withdraw= this.payment_client.pay('05')
    // this.top_up= this.payment_client.pay('20')
    // this.bill_pay= this.payment_client.pay('31')
    // this.bill_lookup= this.payment_client.pay('30')
}
