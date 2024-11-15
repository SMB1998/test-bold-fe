import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter } from "react-router-dom";
import DashboardTransactions from "./components/DashboardTransactions/DashboardTransactions";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <DashboardTransactions />
      </BrowserRouter>
    </div>
  );
};

export default App;
