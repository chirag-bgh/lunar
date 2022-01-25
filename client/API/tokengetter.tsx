import { useMoralis } from 'react-moralis'
let fernet = require('fernet')
import CryptoJS from 'crypto-js'

export async function tokengetter({ ethAddress }: { ethAddress: any }) {
  return new Promise((res, rej) => {
    let username = ethAddress
    let encrypted = CryptoJS.AES.encrypt(
      username,
      CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string),
      { mode: CryptoJS.mode.ECB }
    )

    let endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
    let xhr = new XMLHttpRequest()
    let url = endpoint + 'api/v1/api-token-auth/'
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        let z = JSON.parse(xhr.responseText)['token']
        res(z)
      }
    }

    let data = { username: username, password: encrypted.toString() }
    xhr.send(JSON.stringify(data))
  })
}
