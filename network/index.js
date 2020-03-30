const axios = require('axios')
const _merge = require('lodash.merge')
const _get = require('lodash.get')
const js2xml = require('js2xmlparser')
const _isNil = require('lodash.isnil')
const xml2js = require('xml2js').Parser().parseStringPromise
// const { service_url, payment_url, FettanMerchantID, common_config, PIN } = require('../config')

const process_xml_response = function(xml) {
  console.log('Received: ', xml)
  const { TransActionData: {Acknowledge, ErrorCode, LongMessage, ReferenceNumber, ResponseID, ServiceResponse, ShortMessage, SourceTransID, TimeStamp}} = xml
  if(_get(Acknowledge, '0', 'Failure') === 'Failure') {
    const status = _get(ErrorCode, '0', null)
    const message = _get(LongMessage, '0', null)
    return Promise.reject(new Error(`status: ${status} : ${message}`))
  }
  return null
}

var Client = function(options) {
  options = _isNil(options) ? {} : options
  var FettanMerchantID = options.merchant_id || ''

  var base_url = 'https://api.myamole.com'
  var uat = options.environment !== 'production' ? 'UAT' : ''
  var service_url = `${base_url}/Service${uat}/FettanSVC.svc/api/FettanSVC`
  this.payment_url = `${base_url}/Payment${uat}/FettanPay.svc/api/FettanPay`

  this.common_config = {
    APISignature: options.api_signature || '',
    IPAddress: options.ip_address || '',
    Username: options.username || '',
    Password: options.password || '',
  }

  this.pay = function (CardNumber, Amount, PIN, PaymentAction, SourceTransID, ExpirationDate, OrderDescription, SourceTransactionID) {
    return axios.post(this.payment_url, _merge(this.common_config, {
      CardNumber,
      Amount,
      PIN,
      FettanMerchantID,
      SourceTransID,
      PaymentAction,
      ExpirationDate,
      OrderDescription,
      SourceTransactionID
    })).catch(function(err) { console.log(err.response || err) })
  }

  this.send_otp = function(phone_number, SourceTransID ) {
    const data = _merge(this.common_config, {
      ServiceRequest: {
        Service: 'OTPSend',
        MobileNumber: phone_number
      },
      SourceTransID
    })

    return axios.post(service_url, js2xml.parse('Fettan', data), {
      headers: {
        'Content-Type': 'application/xml',
        'Accept': 'application/xml'
      }
    }).then(function (xml) {
        xml2js(xml.data).then(process_xml_response)})
  }

  // this.service = function (PaymentAction, Amount, CardNumber, SourceTransID, ExpirationDate , OrderDescription, SourceTransactionID) {
  //   const data = {
  //     Header: this.common_config,
  //     ServiceRequest: {
  //       PIN,
  //       FettanMerchantID,
  //       Amount,
  //       CardNumber,
  //       SourceTransID,
  //       PaymentAction,
  //       ExpirationDate,
  //       OrderDescription,
  //       SourceTransactionID
  //     }
  //   }
  //
  //   console.log('Sending request to ', service_url, ' with data ', js2xml.parse('Fettan', data))
  //   // convert data to xml format before sending
  //   return axios.post(service_url, js2xml.parse('Fettan', data), {
  //     headers: {
  //       'Content-Type': 'text/xml'
  //     }
  //   }).catch(function(err) { console.log(err.response || err) })
  // }
}

module.exports = Client