import { useMoralis } from "react-moralis";
// import { TransferButton, DisplayTransaction } from './components/transfer'

// Components
import Dashboard from "./components/Dashboard/Dashboard";
// import Landing from './components/Landing'
<<<<<<< HEAD
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ProductModal from "./components/ProductModal";
import Landingv2 from "./components/Landingv2";
import Landing from "./components/Landing";
=======
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import ProductModal from './components/ProductModal'
import Landingv2 from './components/Landingv2'
import Landing from './components/Landing'
>>>>>>> 2681bc4e13f848836e97831cb404d7dccce97bde

// React
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
<<<<<<< HEAD
  const { enableWeb3, isWeb3Enabled, isAuthenticated, user } = useMoralis();
=======
  const { enableWeb3, isWeb3Enabled, isAuthenticated } = useMoralis()
>>>>>>> 2681bc4e13f848836e97831cb404d7dccce97bde

  const [modalIsOpen, setIsOpen] = useState(false);

  console.log("Web3: " + isWeb3Enabled);
  if (!isWeb3Enabled) {
    enableWeb3();
  }
  // // Moralis
  console.log("Is Authenticated: " + isAuthenticated);
  if (!isAuthenticated) {
<<<<<<< HEAD
    return <Landing />;
=======
    return <Landing />
>>>>>>> 2681bc4e13f848836e97831cb404d7dccce97bde
    // return <Landing/>
  }

  // {/* @ts-ignore */}
  // <h1>Welcome {user.get("ethAddress")}</h1>
  //<LogoutButton />
  //<TransferButton amount={10} address="0x479327C7658AeBFa9F777B1B79D9353C7387e266" />
  //<DisplayTransaction />
  function openModal() {
    setIsOpen(true);
  }
  return (
    <div style={modalIsOpen ? { filter: "brightness(0.5) blur(5px)" } : null}>
      <Routes>
        <Route
          path="/dashboard"
          element={<Dashboard openModal={openModal} />}
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        {/* <Route path='/' element={<Landing />}></Route> */}
        <Route path="/" element={<Landingv2 />}></Route>
      </Routes>
      <ProductModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default App;
