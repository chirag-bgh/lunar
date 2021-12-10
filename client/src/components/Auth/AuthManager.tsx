import { useMoralis } from 'react-moralis'
import CryptoJS from 'crypto-js'

const AuthenticateButton = () => {
  const { authenticate } = useMoralis()

  return (
    <button className='cursor-pointer' onClick={() => authenticate()}>
      Authenticate
    </button>
  )
}

const UserChecker = () => {
  const { user, setUserData, web3 } = useMoralis()

  console.log('password: ', process.env.REACT_APP_PASSWORD)

  if (user.get('encryptedKey') === undefined) {
    let x = web3.eth.accounts.create()

    let encryptedKey = CryptoJS.AES.encrypt(
      x.privateKey,
      process.env.REACT_APP_PASSWORD
    ).toString()
    console.log('private key: ', x.privateKey)

    console.log('encryptedKey: ', encryptedKey)

    var bytes = CryptoJS.AES.decrypt(
      encryptedKey,
      process.env.REACT_APP_PASSWORD
    )
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8)
    console.log('decryptedData: ', decryptedData)

    setUserData({
      managed_account_pub: x.address,
      encryptedKey: encryptedKey,
    })
  }

  return <div></div>
}

const LogoutButton = () => {
  const { logout } = useMoralis()

  return <button onClick={() => logout()}>Logout</button>
}

export { AuthenticateButton, UserChecker, LogoutButton }
