import React, { useState } from "react";
import "./TransactionsTable.css";
import useTransactionFilter from "../../hooks/useTransactionsTableFilter";
import TransactionBanner from "./TransactionTableBanner/TransactionTableBanner";
import TransactionFilter from "./TransactionTableFilter/TransactionTableFilter";
import useTransactions from "../../hooks/useTransactions";

import { formatCurrency } from "../../utils/formatCurrency";
import { Transaction } from "../../interfaces/transactions/transactions";
import TransactionDetailModal from "../TransactionModal/TransactionModal";
import TransactionPaymentMethod from "../TransactionPaymentMethod/TransactionPaymentMethod";
import {
  TransactionPaymentMethods,
  TransactionSalesType,
  TransactionStatus,
  txSalesTypeObject,
  txStatusObject,
} from "./TransactionsTypes/TransactionTypes";
import { formatTransactionDate } from "../../utils/formatTransactionDate ";
import { EmptyDataAlert } from "./EmptyDataAlert/EmptyAlert";

const TransactionsTable: React.FC = () => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const { displayedTransactions } = useTransactions();

  const { filteredTransactions, searchTerm, handleSearchChange } =
    useTransactionFilter(displayedTransactions);

  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="transactions-container">
      <TransactionBanner />

      <TransactionFilter
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />

      <table className="transactions-table">
        <thead>
          <tr>
            <th className="transaction-column">Transacción</th>
            <th className="transaction-column">Fecha y hora</th>
            <th className="transaction-column">Método de pago</th>
            <th className="transaction-column">ID transación Bold</th>
            <th className="transaction-column">Monto</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length === 0 ? (
            <tr>
              <td colSpan={5} className="empty-data-alert">
                <EmptyDataAlert />
              </td>
            </tr>
          ) : (
            filteredTransactions?.map((transaction) => {
              const status = transaction.status as TransactionStatus;
              const salesType = transaction.salesType as TransactionSalesType;
              const paymentMethod =
                transaction.paymentMethod as TransactionPaymentMethods;
              return (
                <tr
                  key={transaction.id}
                  onClick={() => handleRowClick(transaction)}
                >
                  <td>
                    <div className="transaction-col">
                      <div className="transactions-sales-type">
                        {txSalesTypeObject[salesType]?.icon}
                      </div>
                      <div>{txStatusObject[status]?.label}</div>
                    </div>
                  </td>
                  <td style={{ textAlign: "start" }}>
                    {formatTransactionDate(transaction.createdAt)}
                  </td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <TransactionPaymentMethod
                        franchise={transaction.franchise}
                        paymentMethod={paymentMethod}
                        transactionReference={transaction.transactionReference}
                      />
                    </div>
                  </td>
                  <td style={{ textAlign: "start" }}>{transaction.id}</td>
                  <td className="amount-column">
                    <div>
                      <div>{formatCurrency(transaction.amount)}</div>
                      <div className="transactions-payment-deduction">
                        {transaction.deduction && (
                          <div>
                            {"Deducción de Bold"}
                            <div
                              style={{
                                color: "red",
                              }}
                            >
                              {`- ${formatCurrency(transaction.deduction)}`}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default TransactionsTable;
