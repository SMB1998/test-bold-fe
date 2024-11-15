import { FC } from "react";
import "./DashboardTransactions.css";
import TransactionsTable from "../TransactionsTable/TransactionsTable";
import DashboardHeaderContainer from "../DashboardHeaderContainer/DashboardHeaderContainer";
import { LoadingTransactions } from "./LoadingTransactions/LoadingTransactions";
import useTransactions from "../../hooks/useTransactions";

const DashboardTransactions: FC = () => {
  const { isLoaded } = useTransactions();

  if (!isLoaded) {
    return <LoadingTransactions />;
  }
  return (
    <div className="dashboard-transactions-container">
      <DashboardHeaderContainer />
      <TransactionsTable />
    </div>
  );
};

export default DashboardTransactions;
