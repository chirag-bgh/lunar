import { useMoralis } from "react-moralis";

const AuthenticateButton = () => {
  const { authenticate } = useMoralis();

  return <button onClick={() => authenticate()}>Authenticate</button>;

};

const UserChecker = () => {
  const { user,setUserData, web3 } = useMoralis();
  
  let x  = web3.eth.accounts.create();
  
  if (user.get('managed_account_priv') == undefined){
    setUserData({managed_account_pub:x.address,managed_account_priv:x.privateKey})
  } else {
    console.log("bitch")
  }

  console.log('User',user.get('managed_account_priv'))

  return <div></div>

};


const LogoutButton = () => {
  const { logout } = useMoralis();

  return <button onClick={() => logout()}>Logout</button>;
};


export { AuthenticateButton,UserChecker, LogoutButton};
