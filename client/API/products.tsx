export async function productgetter({
  setAcc,
  token
}: {
  setAcc: ({ z }: { z: any }) => void
  token: string
}) {
  if (token !== null) {
    let xhr = new XMLHttpRequest()
    let endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
    let url = endpoint + 'api/v1/products'
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

export async function productadder({
  name,
  price,
  recurrence,
  token,
}: {
  name: string
  price: any
  recurrence: string
  token: string
}) {
  if (token !== null) {
    let xhr = new XMLHttpRequest()
    let endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
    let url = endpoint + 'api/v1/products/add'
    xhr.open('POST', url)
    xhr.setRequestHeader('Authorization', `Token ${token}`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    let z = JSON.stringify({
      name: name,
      price: price,
      recurrence: recurrence,
    })
    xhr.send(z)
  }
}

export async function productdestroy({
  address,
  token,
}: {
  address: any
  token: string
}) {
  if (token !== null) {
    let xhr = new XMLHttpRequest()
    let endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
    let url = endpoint + 'api/v1/products/delete'
    xhr.open('POST', url)
    xhr.setRequestHeader('Authorization', `Token ${token}`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = () => {
      // if (xhr.readyState === 4) {
      //   //   console.log(xhr.status)
      //      console.log('Response: ',xhr.responseText)
      //   }
    }
    let z = JSON.stringify({ objectId: address })
    xhr.send(z)
    // xhr.onloadend = function () {
    //     console.log('Added wallet')
    //     }2
  }
}
