import { useMoralis } from "react-moralis"
var fernet = require('fernet');
import CryptoJS from 'crypto-js'


export async function tokengetter({ethAddress}:{ethAddress:any}){
    return new Promise((res, rej) => {
        let username = ethAddress
    var encrypted =  CryptoJS.AES.encrypt(username, CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_ENCRYPTION_KEY) , {mode:CryptoJS.mode.ECB});

    let endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
    var xhr = new XMLHttpRequest()
    let url = endpoint + 'api/v1/api-token-auth/'
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        let z = JSON.parse(xhr.responseText)['token']
        res(z)

      }
    }

    var data = {username:username,password: encrypted.toString()}
    xhr.send(JSON.stringify(data))


    })
}