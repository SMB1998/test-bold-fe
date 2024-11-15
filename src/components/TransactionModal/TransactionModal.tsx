import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "./TransactionModal.css";
import { Transaction } from "../../interfaces/transactions/transactions";

import { formatCurrency } from "../../utils/formatCurrency";
import TransactionPaymentMethod from "../TransactionPaymentMethod/TransactionPaymentMethod";
import { HiOutlineX } from "react-icons/hi";
import {
  TransactionPaymentMethods,
  TransactionSalesType,
  TransactionStatus,
  txSalesTypeObject,
  txStatusObject,
} from "../TransactionsTable/TransactionsTypes/TransactionTypes";

interface TransactionDetailModalProps {
  transaction: Transaction;
  onClose: () => void;
}

const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  transaction,
  onClose,
}) => {
  const isSuccess = transaction.status === "SUCCESSFUL";
  const txStatus = transaction.status as TransactionStatus;
  const paymentMethod = transaction.paymentMethod as TransactionPaymentMethods;
  const salesType = transaction.salesType as TransactionSalesType;

  return (
    <div className={`modal-overlay ${transaction ? "active" : ""}`}>
      <div className="side-modal">
        <div className="transaction-header">
          <button className="close-btn" onClick={onClose}>
            <HiOutlineX size={24} color="black" />
          </button>

          <div className="status-icon">
            {isSuccess ? (
              <FaCheckCircle size={30} color="#69EFB8" />
            ) : (
              <FaTimesCircle size={30} color="red" />
            )}
          </div>

          <h3 style={{ fontWeight: "bold" }}>
            {isSuccess
              ? `¡${txStatusObject[txStatus]?.label}!`
              : txStatusObject[txStatus]?.label}
          </h3>
          <h3
            style={{
              color: "var(--color-blue)",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {formatCurrency(transaction.amount)}
          </h3>

          <p
            style={{
              fontSize: 12,
            }}
          >
            {new Date(transaction.createdAt).toLocaleString("es-CO", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })}
          </p>
        </div>

        <div className="transaction-info">
          <div className="info-row">
            <span>ID Transacción Bold:</span>
            <strong>{transaction.id}</strong>
          </div>
          <div className="info-row">
            <span>Deducción Bold:</span>
            <strong>
              {" "}
              <div
                style={{
                  color: transaction.deduction ? "red" : "inherit",
                }}
              >
                {transaction.deduction ? `- ` : ``}

                {formatCurrency(transaction.deduction || 0)}
              </div>
            </strong>
          </div>
        </div>

        <div className="separator" />

        <div className="info-row">
          <span>Método de pago:</span>
          <TransactionPaymentMethod
            franchise={transaction.franchise}
            paymentMethod={paymentMethod}
            transactionReference={transaction.transactionReference}
          />
        </div>

        <div className="info-row">
          <span>Tipo de pago:</span>
          <div className="sales-type-info">
            <div>{txSalesTypeObject[salesType]?.icon}</div>
            <div>{txSalesTypeObject[salesType]?.modalLabel}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailModal;
