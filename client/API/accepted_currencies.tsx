import { useMoralis } from "react-moralis"
import { useState, useEffect } from "react"




export async function currencygetter({setAcc}:{setAcc: ({z}:{z:any}) => void}){

    const{user} = useMoralis()
 
        let x = await user?.get('token')

        if(x !== null){
            var xhr = new XMLHttpRequest()
            let endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
            let url = endpoint+ 'api/v1/accepted_currencies'
            xhr.open('GET', url)
            xhr.setRequestHeader('Authorization', `Token ${x}`)
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                let z:any = JSON.parse(xhr.responseText)['items']
                setAcc({z})
              }
            }
        
            var data = { Address:user?.get('ethAddress') }
            xhr.send(JSON.stringify(data))
            // xhr.onloadend = function () {
            //     console.log('Fetched wallet')
            //     }
        }
    
}



export async function currencyadder({address,token}:{address:any,token:string}){



        if(token !== null){
            var xhr = new XMLHttpRequest()
            let endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
            let url = endpoint+ 'api/v1/withdrawal_accounts/add'
            xhr.open('POST', url)
            xhr.setRequestHeader('Authorization', `Token ${token}`)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.onreadystatechange = function () {
              // if (xhr.readyState === 4) {
              //   console.log(xhr.status)
              //   console.log('Response: ',xhr.responseText)
              // }
            }
            var z = JSON.stringify({ "Address":address })
            xhr.send(z)
            // xhr.onloadend = function () {
            //     console.log('Added wallet')
            //     }2
        }
    
}