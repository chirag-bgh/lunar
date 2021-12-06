import { useMoralis } from "react-moralis";
import { AuthenticateButton, LogoutButton } from "./components/Auth";
import { TransferButton,FetchUser } from "./components/transfer";

function App() {
  const { web3, enableWeb3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError, isAuthenticated, user } = useMoralis();

  if (!isAuthenticated) {
    return <AuthenticateButton />;
  }

  if(!isWeb3Enabled){
     enableWeb3()
  }

  console.log(isWeb3Enabled)

  return (
    <div>
      {/* @ts-ignore */}
      <h1>Welcome {user.get("ethAddress")}</h1>
      <LogoutButton />
      <TransferButton amount={10} address="0x0864C60C56e8Ff8Bdd8F1d03Fb817D2A6664e52E" />
      <FetchUser />
    </div>
  );
}

export default App;
