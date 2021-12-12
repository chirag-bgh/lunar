// Modal
// import { useState } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";

export const SettingBackend = ({
  callback,
  webhook,
}: {
  callback: string;
  webhook: string;
}) => {
  const { user, setUserData } = useMoralis();
  const { data, error, isLoading, fetch } = useMoralisQuery(
    "Products",
    (query) => query.equalTo("user", user)
  );

  return (
    <button
      onClick={() => {
        setUserData({
          callbackURL: callback,
          webhookURL: webhook,
        });
        for (let i = 0, len = data.length; i < len; i++) {
          data[i].save({ callback_url: callback, webhook_url: webhook });
        }
        console.log("Data Saved: ", data);
      }}
      className="px-14 py-1 bg-primary rounded-sm flex justify-center items-center font-semibold cursor-pointer"
    >
      Set Configuration
    </button>
  );
};
