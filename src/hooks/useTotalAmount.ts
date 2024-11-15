import { useMemo } from "react";
import { Transaction } from "../interfaces/transactions/transactions";

const useTotalAmount = (transactions: Transaction[]) => {
  return useMemo(() => {
    return transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
  }, [transactions]);
};

export default useTotalAmount;
