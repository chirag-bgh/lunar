import { useWeb3Transfer,useMoralis,useMoralisQuery } from "react-moralis";
import Moralis from "moralis";

const TransferButton = ({amount,address}:{amount:number, address:string}) => {
    const {fetch} = useWeb3Transfer({
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


  
  const DisplayTransaction = () => {
    const { refetchUserData, user } = useMoralis();
    const userAddress = user!.get("ethAddress");
    console.log('DisplayTransaction')

    const { data, error, isLoading } = useMoralisQuery("EthTransactions", query =>
    query
      .equalTo("from_address", userAddress)
      );

if (error) {
  console.log(error)
  return <span>🤯</span>;
}

if (isLoading) {
  return <span>🙄</span>;
}

return <pre>{JSON.stringify(data, null, 2)}</pre>;
   
    }
  


  






export { TransferButton,FetchUser,DisplayTransaction };