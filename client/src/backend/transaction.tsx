import { useMoralis, useMoralisQuery } from "react-moralis";

export const DisplayTransaction = () => {
  const { user } = useMoralis();
  const userAddress = user.get("managed_account_pub");
  const { data, error, isLoading } = useMoralisQuery("Transactions", (query) =>
    query.equalTo("to_address", userAddress)
  );

  if (error) {
    console.log(error);
    return <span>🤯</span>;
  }

  if (isLoading) {
    return <span>🙄</span>;
  }

  return <pre>Hi {JSON.stringify(data, null, 2)}</pre>;
};
