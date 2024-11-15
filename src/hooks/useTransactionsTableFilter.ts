import { useState } from "react";
import { Transaction } from "../interfaces/transactions/transactions";

const useTransactionFilter = (transactions: Transaction[]) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredTransactions = transactions.filter((transaction) =>
    Object.keys(transaction).some((key) =>
      transaction[key]
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

  return { filteredTransactions, searchTerm, handleSearchChange };
};

export default useTransactionFilter;
