import {
  useWeb3Transfer,
  useMoralis,
  useMoralisQuery,
  useNewMoralisObject,
  // useMoralisCloudFunction,
} from "react-moralis";
import Moralis from "moralis";
import { useEffect, useState } from "react";

// Classes
import ProductClass from "../classes/ProductClass";

export const TransferProduct = ({
  objectId,
  recurrence,
  price,
  name,
}: {
  objectId: string;
  recurrence: string;
  price: number;
  name: string;
}) => {
  const { data, error, isLoading } = useMoralisQuery("Products", (query) =>
    query.equalTo("objectId", objectId)
  );

  if (error) {
    return <span>🤯</span>;
  }

  if (isLoading) {
    return <span>🙄</span>;
  }

  let json = JSON.stringify(data, null, 2);

  const product: ProductClass = JSON.parse(json)[0];

  return (
    <TransferButton
      product={product}
      recurrence={recurrence}
      price={price}
      name={name}
    />
  );
};

const TransferButton = ({
  product,
  recurrence,
  price,
  name,
}: {
  product: ProductClass;
  recurrence: string;
  price: number;
  name: string;
}) => {
  const { user } = useMoralis();
  const { fetch, error, isFetching, data } = useWeb3Transfer({
    amount:
      product !== undefined
        ? Moralis.Units.ETH(product.price)
        : Moralis.Units.ETH(0),
    receiver: product !== undefined ? product.user.managed_account_pub : "0x0",
    type: "native",
  });

  const [fetched, setFetched] = useState(false);
  const [called, setcalled] = useState(false);
  const { save: subscription } = useNewMoralisObject("Subscription");
  const { save: transaction } = useNewMoralisObject("Transactions");
  const { save: customer } = useNewMoralisObject("Customer");

  useEffect(() => {
    let x = undefined;
    let counter = 0;
    if (called) {
      if (!fetched) {
        setFetched(true);
        if (product !== undefined) {
          if (product.recurrence !== "One time") {
            if (x == undefined) {
              x = null;
              let y = fetch({
                onSuccess: () => {
                  let cust_id = null;
                  x = subscription({
                    product: product.objectId,
                    status: true,
                    user: user,
                    recurrence: recurrence,
                    price: price,
                    name: name,
                  });
                  console.log("data: ", data);
                  let t = customer({
                    User: product.user.objectId,
                    Type: "Subscription",
                  }).then((res) => {
                    console.log(res.id);
                    cust_id = res.id;
                    let z = transaction({
                      product: product.objectId,
                      status: true,
                      amount: price,
                      to_address: product.user.managed_account_pub,
                      from_address: "0x0",
                      Type: "Subscribed",
                      user: product.user.objectId,
                      customerid: cust_id,
                    });
                    console.log("x: ", x);
                    console.log("y: ", y);
                    console.log("z: ", z);
                  });
                },
                onError: (error) => console.log(error),
              });
              counter = counter + 1;
              console.log("counter: ", counter);
            }
          } else {
            let y = fetch({
              onSuccess: () => {
                let cust_id = null;
                console.log("data: ", data);
                let t = customer({
                  User: product.user.objectId,
                  Type: "Product Purchase",
                }).then((res) => {
                  console.log(res.id);
                  cust_id = res.id;
                  let z = transaction({
                    product: product.objectId,
                    status: true,
                    amount: price,
                    to_address: product.user.managed_account_pub,
                    from_address: "0x0",
                    Type: "Product Purchase",
                    user: product.user.objectId,
                    customerid: cust_id,
                  });
                  console.log("y: ", y);
                  console.log("z: ", z);
                });
              },
              onError: (error) => console.log(error),
            });
          }
        }
      }
    }
  }, [
    called,
    fetched,
    product,
    recurrence,
    price,
    name,
    user,
    fetch,
    subscription,
  ]);

  return (
    <div>
      {error && <h1>Error: {error}</h1>}
      <button
        disabled={isFetching}
        onClick={() => {
          console.log("Transferring");
          setcalled(true);
        }}
        className="h-7 text-sm bg-primary rounded-sm text-black font-display px-2 flex justify-center items-center cursor-pointer"
      >
        Transfer
      </button>
    </div>
  );
};

const Transfer = ({ amount, address }: { amount: number; address: string }) => {
  const { fetch } = useWeb3Transfer({
    amount: Moralis.Units.ETH(amount),
    receiver: address,
    type: "native",
  });
  return fetch();
};

const DisplayTransaction = () => {
  const { user } = useMoralis();
  const userAddress = user!.get("ethAddress");

  const { data, error, isLoading } = useMoralisQuery(
    "EthTransactions",
    (query) => query.equalTo("from_address", userAddress)
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

export { Transfer, DisplayTransaction };
