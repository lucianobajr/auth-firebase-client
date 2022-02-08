import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./context/AuthContext";
import Routes from "./routes";
import GlobalStyles from "./styles/global";

const src: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <AuthContextProvider>
        <ToastContainer />

        <Routes />
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default src;
