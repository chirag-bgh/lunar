import { useMoralis } from 'react-moralis'
import { useState, useEffect } from 'react'

export async function walletgetter({
  setAcc,
}: {
  setAcc: ({ z }: { z: any }) => void
}) {
  const { user } = useMoralis()

  let x = await user?.get('token')

  if (x !== null) {
    let xhr = new XMLHttpRequest()
    let endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
    let url = endpoint + 'api/v1/withdrawal_accounts'
    xhr.open('GET', url)
    xhr.setRequestHeader('Authorization', `Token ${x}`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        let z: any = JSON.parse(xhr.responseText)['items']
        setAcc({ z })
      }
    }

    let data = { Address: user?.get('ethAddress') }
    xhr.send(JSON.stringify(data))
    // xhr.onloadend = function () {
    //     console.log('Fetched wallet')
    //     }
  }
}

export async function walletadder({
  address,
  token,
}: {
  address: string
  token: string
}) {
  if (token !== null) {
    let xhr = new XMLHttpRequest()
    let endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
    let url = endpoint + 'api/v1/withdrawal_accounts/add'
    xhr.open('POST', url)
    xhr.setRequestHeader('Authorization', `Token ${token}`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function () {
      // if (xhr.readyState === 4) {
      //   console.log(xhr.status)
      //   console.log('Response: ',xhr.responseText)
      // }
    }
    let z = JSON.stringify({ Address: address })
    xhr.send(z)
    // xhr.onloadend = function () {
    //     console.log('Added wallet')
    //     }
  }
}

export async function walletdestroy({
  address,
  token,
}: {
  address: any
  token: string
}) {
  if (token !== null) {
    let xhr = new XMLHttpRequest()
    let endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
    let url = endpoint + 'api/v1/withdrawal_accounts/delete'
    xhr.open('POST', url)
    xhr.setRequestHeader('Authorization', `Token ${token}`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = () => {
     if (xhr.readyState === 4) {
       }
    }
    let z = JSON.stringify({'address':address})
    xhr.send(z)
    // xhr.onloadend = function () {
    //     console.log('Added wallet')
    //     }2
  }
}
