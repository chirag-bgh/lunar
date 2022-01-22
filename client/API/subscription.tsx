import { useMoralis } from 'react-moralis'
import { useState, useEffect } from 'react'

export async function subscriptiongetter({
  setAcc,
}: {
  setAcc: ({ z }: { z: any }) => void
}) {
  const { user } = useMoralis()

  let x = await user?.get('token')

  if (x !== null) {
    let xhr = new XMLHttpRequest()
    let endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
    let url = endpoint + 'api/v1/subscriptions'
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
    let t = JSON.stringify(data)
    xhr.send(JSON.stringify(t))
  }
}
