import { useWeb3Transfer,useMoralis } from "react-moralis";
import Moralis from "moralis";

const TransferButton = ({amount,address}:{amount:number, address:string}) => {
    const {fetch, error} = useWeb3Transfer({
      amount: Moralis.Units.ETH(amount),
      receiver: address,
      type: "native",
    });
    
    return (<div>
      <button onClick={() => fetch()}>Transfer</button>
    </div>)
  }



const FetchUser = () => {

const { refetchUserData, isUserUpdating, userError, user } = useMoralis();

return (
  <div>
    {userError && <p>{userError.message}</p>}
    
    <pre>
      {JSON.stringify(user)}
    </pre>

    <button onClick={() => refetchUserData()} disabled={isUserUpdating}>
      Refetch user data
    </button>
  </div>
)
}










export { TransferButton,FetchUser };