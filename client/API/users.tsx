import { useMoralis } from 'react-moralis'
let fernet = require('fernet')
import CryptoJS from 'crypto-js'

export async function usergetter({ token }: { token: any }) {
  return new Promise((res, rej) => {
    if (token !== null) {
      console.log('Token: ', token)
      let xhr = new XMLHttpRequest()
      let endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
      let url = endpoint + 'api/v1/users'
      xhr.open('GET', url)
      xhr.setRequestHeader('Authorization', `Token ${token}`)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          res(JSON.parse(xhr.responseText))
        }
      }
      xhr.send()
    }
  })
}
