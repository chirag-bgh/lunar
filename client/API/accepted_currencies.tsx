import { useMoralis } from 'react-moralis'
import { useState, useEffect } from 'react'

export async function currencygetter({
  setAcc,
  token,
}: {
  setAcc: ({ z }: { z: any }) => void
  token: string
}) {
  // const { user } = useMoralis()

  // let x = await user?.get('token')

  if (token !== null) {
    let xhr = new XMLHttpRequest()
    let endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
    let url = endpoint + 'api/v1/accepted_currencies'
    xhr.open('GET', url)
    xhr.setRequestHeader('Authorization', `Token ${token}`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let z: any = JSON.parse(xhr.responseText)['items']

        setAcc({ z })
      }
    }

    // let data = { Address: user?.get('ethAddress') }
    xhr.send()
    // xhr.onloadend = function () {
    //     console.log('Fetched wallet')
    //     }
  }
}

export async function currencysave({
  address,
  token,
}: {
  address: string[]
  token: string
}) {
  if (token !== null) {
    let xhr = new XMLHttpRequest()
    let endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
    let url = endpoint + 'api/v1/accepted_currencies/save'
    xhr.open('POST', url)
    xhr.setRequestHeader('Authorization', `Token ${token}`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      //   console.log(xhr.status)
      }
    }
    let z = JSON.stringify({ Currency: address })
    xhr.send(z)
    // xhr.onloadend = function () {
    //     console.log('Added wallet')
    //     }2
  }
}
