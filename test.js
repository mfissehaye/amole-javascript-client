const AmoleClient = require('.')

const client = new AmoleClient( {
    "environment": "production",
    "api_signature": "iOY31VA18i4I_Dn0uznD-_xr6-HkpQ0HXt3a8sX3m6u5RZECMfHVTDRC8AzzAvJAEM",
    "ip_address": "46.101.52.185",
    "username": "deamat",
    "merchant_id": "DEHQFMAN01",
    "password": "D2KmWL97-Dtx"
})

client.send_otp('0973053999')
// client.sale('0973053999', '20', '6997')
