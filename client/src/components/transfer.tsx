import { useWeb3Transfer, useMoralisQuery } from "react-moralis";
import Moralis from "moralis";

const Transfer = ({ objectID }: { objectID: string }) => {
  const { data } = useMoralisQuery("Products", (query) =>
    query.equalTo("objectID", objectID)
  );
  const { fetch } = useWeb3Transfer({
    amount: Moralis.Units.ETH(10),
    receiver: "Hi",
    type: "native",
  });

  return fetch();
};

export { Transfer };
