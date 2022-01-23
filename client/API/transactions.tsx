import { useMoralis } from 'react-moralis'

export async function transactiongetter({
  setAcc,
  token,
}: {
  setAcc: ({ z }: { z: any }) => void
  token: string
}) {
  if (token !== null) {
    let xhr = new XMLHttpRequest()
    let endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
    let url = endpoint + 'api/v1/transactions'
    xhr.open('GET', url)
    xhr.setRequestHeader('Authorization', `Token ${token}`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        let z: any = JSON.parse(xhr.responseText)['items']
        setAcc({ z })
      }
    }

    // let data = { Address: user?.get('ethAddress') }
    // let t = JSON.stringify(data)
    xhr.send()
  }
}
