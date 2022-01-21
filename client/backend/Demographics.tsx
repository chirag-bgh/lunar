import { useMoralis } from 'react-moralis'
import DemographicsClass from '../classes/Demographics'
import { useState } from 'react'
import { demographicsgetter } from '../API/demographics'

//Queries Moralis DB for countries and returns a table of countries for the demographics tab
export const GetCountries = () => {
  const { user } = useMoralis()

  const [data, setAccounts] = useState([])
  const [accfetched, setaccfetched] = useState(false)

  if(!accfetched){
    demographicsgetter({setAcc})
    setaccfetched(true)
  }
  function setAcc({z}:{z:any}) {
    setAccounts(z)
  }
  
  let json = JSON.stringify(data, null, 2)

  let demographics: DemographicsClass[] = JSON.parse(json)
  let countries: any = {}

  demographics.forEach((demographic: any) => {
    //console.log('demographic country: ', countries[demographic.country])

    if (countries[demographic.country] !== undefined) {
      countries[demographic.country] += 1
    } else {
      countries[demographic.country] = 1
    }
  })

  //console.log("countries:", countries);

  let countryNames = Object.keys(countries)

  countryNames = countryNames.splice(0, 4)

  return (
    <table className='text-white w-3/4 font-display'>
      <tbody>
        <tr>
          <th className='text-left font-light px-0'>COUNTRY</th>
          <th className='text-right font-light px-0'>USERS</th>
        </tr>
        {countryNames.map((country) => {
          let users = countries[country]
          return (
            <tr className='border-t border-solid border-gray-500' key={country}>
              <td className='text-left px-0'>{country}</td>
              <td className='text-right px-0'>{users}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

//Queries Moralis DB for cities and returns a table of cities for the demographics tab
export const GetCities = () => {
  const { user } = useMoralis()

  const [data, setAccounts] = useState([])
  const [accfetched, setaccfetched] = useState(false)

  if(!accfetched){
    demographicsgetter({setAcc})
    setaccfetched(true)
  }
  function setAcc({z}:{z:any}) {
    setAccounts(z)
  }

  let json = JSON.stringify(data, null, 2)

  let demographics: DemographicsClass[] = JSON.parse(json)

  let cities: any = {}

  demographics.forEach((demographic: any) => {
    if (cities[demographic.city] !== undefined) {
      cities[demographic.city] += 1
    } else {
      cities[demographic.city] = 1
    }
  })

  let cityNames = Object.keys(cities)

  cityNames = cityNames.splice(0, 4)

  // console.log('cityNames:', cityNames)

  return (
    <table className='text-white w-3/4 font-display'>
      <tbody>
        <tr>
          <th className='text-left font-light px-0'>CITY</th>
          <th className='text-right font-light px-0'>USERS</th>
        </tr>
        {cityNames.map((city) => {
          let users = cities[city]
          return (
            <tr className='border-t border-solid border-gray-500' key={city}>
              <td className='text-left px-0'>{city}</td>
              <td className='text-right px-0'>{users}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

//Queries Moralis DB for users and returns a table of users (email addresses) for the demographics tab
export const GetUsers = () => {
  const { user } = useMoralis()

  const [data, setAccounts] = useState([])
  const [accfetched, setaccfetched] = useState(false)

  if(!accfetched){
    demographicsgetter({setAcc})
    setaccfetched(true)
  }
  function setAcc({z}:{z:any}) {
    setAccounts(z)
  }


  let json = JSON.stringify(data, null, 2)

  let demographics: DemographicsClass[] = JSON.parse(json)

  return <h1 className='text-4xl font-semibold'>{demographics.length}</h1>
}

// Returns the leaderboard of the top ten users
export const GetUserLeaderboard = () => {
  const { user } = useMoralis()

  const [data, setAccounts] = useState([])
  const [accfetched, setaccfetched] = useState(false)

  if(!accfetched){
    demographicsgetter({setAcc})
    setaccfetched(true)
  }
  function setAcc({z}:{z:any}) {
    setAccounts(z)
  }

  let json = JSON.stringify(data, null, 2)

  let demographics: DemographicsClass[] = JSON.parse(json)

  let totalSpentDict: any = {}

  demographics.forEach((demographic: any) => {
    totalSpentDict[demographic.totalSpent] = demographic.email
  })

  let totalSpentArray: any[] = Object.keys(totalSpentDict)

  totalSpentArray.sort((a, b) => {
    return b - a
  })

  totalSpentArray = totalSpentArray.splice(0, 10)

  return (
    <table className='text-white w-3/4 font-display'>
      <tbody>
        <tr>
          <th className='text-left font-light px-0'>USER</th>
          <th className='text-right font-light px-0'>TOTAL SPENT</th>
        </tr>
        {totalSpentArray.map((totalSpent: any) => {
          let email = totalSpentDict[totalSpent]
          return (
            <tr
              className='border-t border-solid border-gray-500'
              key={totalSpent}
            >
              <td className='text-left px-0'>{email}</td>
              <td className='text-right px-0'>
                {totalSpent.substring(0, 5)} ETH
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
