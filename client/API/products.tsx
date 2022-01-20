import { useMoralis } from "react-moralis"
import { useState, useEffect } from "react"




export async function productgetter({setAcc}:{setAcc: ({z}:{z:any}) => void}){

    const{user} = useMoralis()
 
        let x = await user?.get('token')

        if(x !== null){
            var xhr = new XMLHttpRequest()
            let endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
            console.log("Endpoint: ",endpoint)
            let url = endpoint+ 'api/v1/products'
            xhr.open('GET', url)
            xhr.setRequestHeader('Authorization', `Token ${x}`)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                let z:any = JSON.parse(xhr.responseText)['items']
                setAcc({z})
                console.log(z)
              }
            }
        
            var data = { Address:user?.get('ethAddress') }
            var t = JSON.stringify(data)
            xhr.send(JSON.stringify(t))
            xhr.onloadend = function () {
                console.log('Fetched Transactions')
                }
        }
    
}


export async function productadder({name,price,currency,recurrence,token}:{name:string,price:any,currency:any,recurrence:string,token:string}){



  if(token !== null){
      var xhr = new XMLHttpRequest()
      let endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
      let url = endpoint+ 'api/v1/products/add'
      xhr.open('POST', url)
      xhr.setRequestHeader('Authorization', `Token ${token}`)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          console.log(xhr.status)
          console.log('Response: ',xhr.responseText)
        }
      }
      var z = JSON.stringify({'name':name,'price':price,'default_currency':currency,'recurrence':recurrence})
      xhr.send(z)
      xhr.onloadend = function () {
          console.log('Added wallet')
          }
  }

}