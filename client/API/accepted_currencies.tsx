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
  console.log('SDFSHDFHGDHFJDF')

  if (token !== null) {
    let xhr = new XMLHttpRequest()
    let endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
    let url = endpoint + 'api/v1/accepted_currencies'
    xhr.open('GET', url)
    xhr.setRequestHeader('Authorization', `Token ${token}`)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let z: any = JSON.parse(xhr.responseText)['items']
        console.log('response:', xhr.responseText)

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

export async function currencyadder({
  address,
  token,
}: {
  address: any
  token: string
}) {
  if (token !== null) {
    let xhr = new XMLHttpRequest()
    let endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
    let url = endpoint + 'api/v1/withdrawal_accounts/add'
    xhr.open('POST', url)
    xhr.setRequestHeader('Authorization', `Token ${token}`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = () => {
      // if (xhr.readyState === 4) {
      //   console.log(xhr.status)
      //   console.log('Response: ',xhr.responseText)
      // }
    }
    let z = JSON.stringify({ Address: address })
    xhr.send(z)
    // xhr.onloadend = function () {
    //     console.log('Added wallet')
    //     }2
  }
}
