import { useWeb3Transfer,useMoralis,useMoralisQuery } from "react-moralis";
import Moralis from "moralis";

// {amount,address}:{amount:number, address:string}

const Transfer = () => {
  let amount = 10; 
  let address = "hi"
  const {fetch} = useWeb3Transfer({
    amount: Moralis.Units.ETH(amount),
    receiver: address,
    type: "native",
  });
  
  return (fetch())
  }


  const TransferButton = ({objectID}:{objectID:string}) => {
    const { data } = useMoralisQuery('Products', (query) =>
    query.equalTo('objectID', objectID)
  )
  let json = JSON.stringify(data, null, 2)
    return (
    <div>
      <button onClick={()=>Transfer}>Transfer</button>
    </div>
    )
  }

  
  const DisplayTransaction = () => {
    const { user } = useMoralis();
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
  


  






export { Transfer,DisplayTransaction };