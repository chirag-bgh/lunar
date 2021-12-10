import {
  useWeb3Transfer,
  useMoralis,
  useMoralisQuery,
  useNewMoralisObject,
  // useMoralisCloudFunction,
} from "react-moralis";
import Moralis from "moralis";
import { useState } from "react";

// Spinner
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

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
  console.log("json: ", json);
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
  const { fetch, isFetching, data } = useWeb3Transfer({
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

  async function transferPayment() {
    let x = undefined;

    if (!fetched) {
      setFetched(true);
      if (product !== undefined) {
        if (product.recurrence !== "One time") {
          if (x === undefined) {
            x = null;
            fetch({
              onSuccess: () => {
                let cust_id = null;
                subscription({
                  product: product.objectId,
                  status: true,
                  user: user,
                  recurrence: recurrence,
                  price: price,
                  name: name,
                });
                // console.log('data: ', data)
                customer({
                  User: product.user.objectId,
                  Type: "Subscription",
                }).then((res) => {
                  console.log(res.id);
                  cust_id = res.id;
                  transaction({
                    product: product.objectId,
                    status: true,
                    amount: price,
                    to_address: product.user.managed_account_pub,
                    from_address: "0x0",
                    Type: "Subscribed",
                    user: product.user.objectId,
                    customerid: cust_id,
                  });
                  setcalled(false);
                });
              },
              onError: (error) => {
                console.log("error", error);
                setcalled(false);
              },
            });
          }
        } else {
          fetch({
            onSuccess: () => {
              let cust_id = null;
              console.log("data: ", data);
              customer({
                User: product.user.objectId,
                Type: "Product Purchase",
              }).then((res) => {
                console.log(res.id);
                cust_id = res.id;
                transaction({
                  product: product.objectId,
                  status: true,
                  amount: price,
                  to_address: product.user.managed_account_pub,
                  from_address: "0x0",
                  Type: "Product Purchase",
                  user: product.user.objectId,
                  customerid: cust_id,
                });
                setcalled(false);
              });
            },
            onError: (error) => {
              console.log("error", error);
              setcalled(false);
            },
          });
        }
      }
    }
  }

  return (
    <div>
      <button
        disabled={isFetching}
        onClick={() => {
          console.log("Transferring");
          setcalled(true);
          transferPayment();
        }}
        className="h-7 text-sm bg-primary rounded-sm text-black font-display px-2 flex justify-center items-center cursor-pointer"
      >
        {!called ? (
          <span>Transfer</span>
        ) : (
          <div className="flex justify-center items-center ">
            <span>Transferring </span>
            <Loader type="Puff" color="black" height={20} width={30} />
          </div>
        )}
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
