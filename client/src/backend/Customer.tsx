import { useMoralis, useMoralisQuery } from "react-moralis";

export const DisplayCustomer = () => {
  const { user } = useMoralis();
  const userAddress = user.id;
  const { data, error, isLoading } = useMoralisQuery("Customer", (query) =>
    query.equalTo("User", userAddress)
  );

  if (error) {
    console.log(error);
    return <span>🤯</span>;
  }

  if (isLoading) {
    return <span>🙄</span>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
