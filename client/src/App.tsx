import { useMoralis } from "react-moralis";
import { AuthenticateButton, LogoutButton } from "./components/Auth";

function App() {
  const { authenticate, isAuthenticated, user } = useMoralis();

  if (!isAuthenticated) {
    return <AuthenticateButton />;
  }
  return (
    <div>
      {/* @ts-ignore */}
      <h1>Welcome {user.get("username")}</h1>
      <LogoutButton />
    </div>
  );
}

export default App;
