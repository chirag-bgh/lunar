import { useMoralisQuery } from 'react-moralis'
import DemographicsClass from '../classes/Demographics'

export const GetCountries = () => {
  const { data, error, isLoading } = useMoralisQuery('Demographics')

  if (error) {
    return <span>🤯</span>
  }

  if (isLoading) {
    return <span>🙄</span>
  }

  let json = JSON.stringify(data, null, 2)

  let demographics: DemographicsClass[] = JSON.parse(json)

  let countries = {}

  demographics.forEach((demographic) => {
    console.log('demographic country: ', countries[demographic.country])

    if (countries[demographic.country] !== undefined) {
      countries[demographic.country] += 1
    } else {
      countries[demographic.country] = 1
    }
  })

  console.log('countries:', countries)

  let countryNames = Object.keys(countries)

  countryNames = countryNames.splice(0, 4)

  return (
    <table className='text-white w-3/4 font-display'>
      <tr>
        <th className='text-left font-light px-0'>COUNTRY</th>
        <th className='text-right font-light px-0'>USERS</th>
      </tr>
      {countryNames.map((country) => {
        let users = countries[country]
        return (
          <tr className='border-t border-solid border-gray-500'>
            <td className='text-left px-0'>{country}</td>
            <td className='text-right px-0'>{users}</td>
          </tr>
        )
      })}
    </table>
  )
}

export const GetCities = () => {
  const { data, error, isLoading } = useMoralisQuery('Demographics')

  if (error) {
    return <span>🤯</span>
  }

  if (isLoading) {
    return <span>🙄</span>
  }

  let json = JSON.stringify(data, null, 2)

  let demographics: DemographicsClass[] = JSON.parse(json)

  let cities = {}

  demographics.forEach((demographic) => {
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
      <tr>
        <th className='text-left font-light px-0'>CITY</th>
        <th className='text-right font-light px-0'>USERS</th>
      </tr>
      {cityNames.map((city) => {
        let users = cities[city]
        return (
          <tr className='border-t border-solid border-gray-500'>
            <td className='text-left px-0'>{city}</td>
            <td className='text-right px-0'>{users}</td>
          </tr>
        )
      })}
    </table>
  )
}

export const GetUsers = () => {
  const { data, error, isLoading } = useMoralisQuery('Demographics')

  if (error) {
    return <span>🤯</span>
  }

  if (isLoading) {
    return <span>🙄</span>
  }

  let json = JSON.stringify(data, null, 2)

  let demographics: DemographicsClass[] = JSON.parse(json)

  return <h1 className='text-4xl font-semibold'>{demographics.length}</h1>
}

export const GetUserLeaderboard = () => {
  const { data, error, isLoading } = useMoralisQuery('Demographics')

  if (error) {
    return <span>🤯</span>
  }

  if (isLoading) {
    return <span>🙄</span>
  }

  let json = JSON.stringify(data, null, 2)

  let demographics: DemographicsClass[] = JSON.parse(json)

  let totalSpentDict = {}

  demographics.forEach((demographic) => {
    totalSpentDict[demographic.totalSpent] = demographic.email
  })

  let totalSpentArray: any[] = Object.keys(totalSpentDict)

  totalSpentArray.sort((a, b) => {
    return b - a
  })

  totalSpentArray = totalSpentArray.splice(0, 10)

  return (
    <table className='text-white w-3/4 font-display'>
      <tr>
        <th className='text-left font-light px-0'>USER</th>
        <th className='text-right font-light px-0'>TOTAL SPENT</th>
      </tr>
      {totalSpentArray.map((totalSpent) => {
        let email = totalSpentDict[totalSpent]
        return (
          <tr className='border-t border-solid border-gray-500'>
            <td className='text-left px-0'>{email}</td>
            <td className='text-right px-0'>{totalSpent}</td>
          </tr>
        )
      })}
    </table>
  )
}
