import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import AppContext from "../contexts/AppContext";
import Login from "./Login.js"
import SignUp from "./SignUp.js"
import Wallet from "./Wallet.js"
import NewIn from "./NewIn";
import NewOut from "./NewOut";

export default function App() {
  const [token, setToken] = useState(null)
  const [name, setName] = useState(null)

  const context = { token, setToken, name, setName }

  return (
    <AppContext.Provider value={context}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/wallet" element={<Wallet />}></Route>
          <Route path="/wallet/new-in" element={<NewIn />}></Route>
          <Route path="/wallet/new-out" element={<NewOut />}></Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}