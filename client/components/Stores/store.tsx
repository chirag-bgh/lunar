import React from 'react'

export const StoreContext = React.createContext(null)

export default ({ children }:{children:any}) => {
  const usr = {ethaddress:" "}

  const [user, setUser] = React.useState([])


  const store = {
    sharing: [user, setUser],

  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>