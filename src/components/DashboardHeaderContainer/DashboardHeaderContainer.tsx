import { FC } from "react";
import "./DashboardHeaderContainer.css";
import TotalTransactionIndicator from "./TotalTransactionsIndicator/TotalTransactionIndicator";
import TransactionsPerdiosTabs from "./TransactionsPerdiosTabs/TransactionsPerdiosTabs";
import Filters from "../Filters/Filters";
import useTransactions from "../../hooks/useTransactions";

const DashboardHeaderContainer: FC = () => {
  const { filters, handleFilterChange, applyFilters } = useTransactions();

  return (
    <div className="dashboard-header-container">
      <div className="left-card">
        <TotalTransactionIndicator />
      </div>
      <div className="right-tabs">
        <TransactionsPerdiosTabs />
        <Filters
          filters={filters}
          handleFilterChange={handleFilterChange}
          applyFilters={applyFilters}
        />
      </div>
    </div>
  );
};

export default DashboardHeaderContainer;
