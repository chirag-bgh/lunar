import { useMoralis } from "react-moralis";
import CryptoJS from "crypto-js";
import { useState } from "react";

// Spinner
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const AuthenticateButton = () => {
  const { enableWeb3, isWeb3Enabled, authenticate } = useMoralis();
  const [called, setcalled] = useState(false);

  return (
<<<<<<< HEAD
    <button className='cursor-pointer md:text-md text-sm font-display' onClick={() => authenticate()}>
      Authenticate
    </button>
  )
}
=======
    <div>
      <button
        onClick={() => {
          if (!isWeb3Enabled) {
            enableWeb3();
          }
          authenticate();
          setcalled(true);
        }}
        className="px-14 py-1 bg-primary rounded-sm flex justify-center items-center font-semibold cursor-pointer"
      >
        {!called ? (
          <span>Authenticate</span>
        ) : (
          <div className="flex justify-center items-center ">
            <span>Authenticating </span>
            <Loader type="Puff" color="black" height={20} width={30} />
          </div>
        )}
      </button>
    </div>
  );
};
>>>>>>> 4f6df1ffd53102c7fd6088162fca2155515d07a6

const UserChecker = () => {
  const { user, setUserData, web3, isWeb3Enabled, enableWeb3 } = useMoralis();
  if (!isWeb3Enabled) {
    enableWeb3();
  }

  console.log("password: ", process.env.REACT_APP_PASSWORD);

  if (user.get("encryptedKey") === undefined) {
    let x = web3.eth.accounts.create();

    let encryptedKey = CryptoJS.AES.encrypt(
      x.privateKey,
      process.env.REACT_APP_PASSWORD
    ).toString();
    console.log("private key: ", x.privateKey);

    console.log("encryptedKey: ", encryptedKey);

    var bytes = CryptoJS.AES.decrypt(
      encryptedKey,
      process.env.REACT_APP_PASSWORD
    );
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    console.log("decryptedData: ", decryptedData);

    setUserData({
      managed_account_pub: x.address,
      encryptedKey: encryptedKey,
    });

    // withdrawalAddress.addUnique(x.address),
  }

  return <div></div>;
};

const LogoutButton = () => {
  const { logout } = useMoralis();

  return <button onClick={() => logout()}>Logout</button>;
};

export { AuthenticateButton, UserChecker, LogoutButton };
