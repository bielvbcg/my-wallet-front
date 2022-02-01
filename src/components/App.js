import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import AppContext from "../contexts/AppContext";
import Login from "./Login.js"
import SignUp from "./SignUp.js"
import Wallet from "./Wallet.js"

export default function App() {

  const context = {}

  return (
    <AppContext.Provider value={context}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/wallet" element={<Wallet />}></Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}