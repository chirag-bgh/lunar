import { useWeb3Transfer,useMoralis,useMoralisQuery } from "react-moralis";
import Moralis from "moralis";

const Transfer = ({objectID}:{objectID:string}) => {
    const { data } = useMoralisQuery('Products', (query) =>
    query.equalTo('objectID', objectID)
  )
  const {fetch} = useWeb3Transfer({
    amount: Moralis.Units.ETH(10),
    receiver: "Hi",
    type: "native",
  });
    
    return (fetch())
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