const axios = require('axios')
const _isNil = require('lodash.isnil')

module.exports = function(options) {
  options = _isNil(options) ? {} : options
  var merchant_id = options.merchant_id || ''
  var uat = options.uat || false
  var base_url = uat ? 'http://uat.api.myamole.com:10080/amole' : 'http://prod.api.myamole.com:8075/amole'
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
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  this.pay = function (phone, amount, pin, payment_action, expiration_date, description, source_transaction_id, vendor_account, additional_info_1) {
    var params = {
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

    var data = Object.entries(params)
        .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
        .join('&')

    return axios
        .post(`${base_url}/pay`, data, {
          headers: headers
        }).then(response => {
          const data = response.data
          if(data && data[0].HDR_Acknowledge === 'Failure')
            throw new Error(data.MSG_LongMessage)
          return data[0]
        })
  }

  this.send_otp = function(phone, source_transaction_id ) {
    var params = {
      BODY_ServiceRequest: `<Service>OTPSend</Service><KeyValue>${phone}</KeyValue>`,
      BODY_SourceTransID: source_transaction_id
    }

    var data = Object.entries(params)
        .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
        .join('&')

    return axios.post(`${base_url}/service`, data, {
      headers: headers
    }).then(response => {
      const data = response.data
      if(data && data[0].HDR_Acknowledge === 'Failure')
        return new Error(data.MSG_LongMessage)
      return data[0]
    })
  }
}
