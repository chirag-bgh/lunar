import { useMoralis } from "react-moralis";

const AuthenticateButton = () => {
  const { authenticate } = useMoralis();

  return <button onClick={() => authenticate()}>Authenticate</button>;
};

const LogoutButton = () => {
  const { logout } = useMoralis();

  return <button onClick={() => logout()}>Logout</button>;
};

export { AuthenticateButton, LogoutButton };
