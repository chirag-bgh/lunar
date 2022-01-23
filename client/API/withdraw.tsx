export async function withdrawadder({
    amount,
    token,
    address,
  }: {
    amount: string,
    token: string,
    address:string
  }) {
    if (token !== null) {
      let xhr = new XMLHttpRequest()
      let endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
      let url = endpoint + 'api/v1/withdraw'
      xhr.open('POST', url)
      xhr.setRequestHeader('Authorization', `Token ${token}`)
      xhr.setRequestHeader('Content-Type', 'application/json')
    //   xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4) {
    //       let z: any = JSON.parse(xhr.responseText)['items']
    //       setAcc({ z })
    //     }
    //   }
  
      let data = { 'to_address': address , "amount":amount}
      let t = JSON.stringify(data)
      xhr.send(t)
    }
  }
  