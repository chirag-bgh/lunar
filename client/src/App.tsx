import { useMoralis } from "react-moralis";
import { AuthenticateButton, LogoutButton } from "./components/Auth";
import { TransferButton,DisplayTransaction } from "./components/transfer";


function App() {
  const { enableWeb3, isWeb3Enabled, isAuthenticated, user } = useMoralis();

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
      <TransferButton amount={10} address="0x479327C7658AeBFa9F777B1B79D9353C7387e266" />
      <DisplayTransaction />
    </div>
  );
}

export default App;
