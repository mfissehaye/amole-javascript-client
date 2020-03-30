const Client = require('./network')
// const _concat = require('lodash/concat')

var Service = function(options) {
    this.client = new Client(options)

    this.send_otp = function (phone_number) {
        return this.client.send_otp(phone_number)
    }

    // this.get_account = function(account_number, merchant_id) {
    //     return this.client.service({
    //         Service: 'AccountGet',
    //         KeyValue: account_number,
    //         MerchantID: merchant_id
    //     })
    // }
    //
    // this.check_balance = function() {}
    //
    // this.get_customer = function(key_value, key_value_1, key_value_2, key_value_3) {
    //     return this.client.service({
    //         Service: 'CustomerGet',
    //         KeyValue: key_value,
    //         KeyValue1: key_value_1,
    //         KeyValue2: key_value_2,
    //         KeyValue3: key_value_3
    //     })
    // },
    //
    // this.add_customer = function(details) {
    //     const info  = { first_name, middle_name, third_name, mobile_number, email, city, country, nationality, residency, birth_date, ext_key_1, ext_key_2, ext_key_3 } = details
    //     return this.client.service(_concat(info, {
    //         Service: 'AccountGet',
    //         SourceCode: 'IBI'
    //     }))
    // },
    //
    // this.update_customer = function() {}
    //
    //
    //
    // this.verify_otp = function(MobileNumber, OTP) {
    //     return this.client.service({
    //         Service: 'OTPVerify',
    //         MobileNumber: MobileNumber,
    //         OTP: OTP
    //     })
    // }
    //
    // this.reverse_transaction = function(original_reference_number, original_confirmation_number) {
    //     return this.client.service({
    //         Service: 'Reversal',
    //         OrigRefNo: original_reference_number,
    //         OrigConfNo: original_confirmation_number
    //     })
    // }
    //
    // this.send_sms = function(mobile_number, message) {
    //     return this.client.service({
    //         Service: 'SendSMS',
    //         SendToMobile: mobile_number,
    //         MessageTet: message
    //     })
    // }
    //
    // this.get_transactions = function() {}
    //
    // this.account_transfer = function(source_account, destination_account, amount) {
    //     return this.client.service({
    //         Service: 'Transfer',
    //         SourceAccount: source_account,
    //         DestAccount: destination_account,
    //         Amount: amount
    //     })
    // },
    //
    // this.customer_transfer = function(source_account, pin, destination_mobile_number, amount) {
    //     return this.client.service({
    //         Service: 'TransferP2P',
    //         SourceAccount: source_account,
    //         PIN: pin,
    //         DestMobile: destination_mobile_number,
    //         Amount: amount
    //     })
    // },
    //
    // this.validate_card = function(key_value, card_number, expiration_date, amount) {
    //     return this.client.service({
    //         Service: 'BalanceCheck',
    //         KeyValue: key_value,
    //         CardNumber: card_number,
    //         ExpirationDate: expiration_date,
    //         Amount: amount
    //     })
    // }
}

module.exports = Service