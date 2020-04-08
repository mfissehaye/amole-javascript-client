const axios = require('axios')
const _isNil = require('lodash.isnil')

module.exports = function(options) {
  options = _isNil(options) ? {} : options
  var merchant_id = options.merchant_id || ''
  var base_url = 'http://prod.api.myamole.com:8075/amole'
  var api_signature = options.api_signature || ''
  var ip_address = options.ip_address || ''
  var username = options.username || ''
  var password = options.password || ''

  var headers = {
    HDR_Signature: api_signature,
    HDR_IPAddress: ip_address,
    HDR_UserName: username,
    HDR_Password: password,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  this.pay = function (phone, amount, pin, payment_action, expiration_date, description, source_transaction_id, vendor_account, additional_info_1) {
    var data = {
      BODY_CardNumber: phone,
      BODY_ExpirationDate: expiration_date,
      BODY_PIN: pin,
      BODY_PaymentAction: payment_action,
      BODY_AmountX: amount,
      BODY_AmoleMerchantID: merchant_id,
      BODY_OrderDescription: description,
      BODY_SourceTransactionID: source_transaction_id,
      BODY_VendorAccount: vendor_account,
      BODY_AdditionalInfo1: additional_info_1
    }

    return axios
        .post(`${base_url}/pay`, data, {
          headers: headers
        }).then(response => console.log(response))
        .catch(err => console.log(err))
  }

  this.send_otp = function(phone, source_transaction_id ) {
    var data = {
      BODY_ServiceRequest: `<Service>GetCustomer</Service><KeyValue>${phone}</KeyValue>`,
      BODY_SourceTransID: source_transaction_id
    }

    return axios.post(`${base_url}/service`, data, {
      headers: headers
    }).then(response => console.log(response))
        .catch(err => console.log(err))
  }
}
