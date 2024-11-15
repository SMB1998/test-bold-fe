import React from "react";
import { FranchiseIcon } from "./FranchiseIcon"; // Ajusta la ruta si es necesario
import {
  TransactionPaymentMethods,
  txPaymentMethodsObject,
} from "../TransactionsTable/TransactionsTypes/TransactionTypes";

interface TransactionPaymentMethodProps {
  franchise?: string;
  paymentMethod: TransactionPaymentMethods;
  transactionReference?: number;
}

const TransactionPaymentMethod: React.FC<TransactionPaymentMethodProps> = ({
  franchise,
  paymentMethod,
  transactionReference,
}) => {
  return (
    <div style={{ display: "flex" }}>
      <div className="transactions-payment-method">
        {franchise ? (
          <FranchiseIcon franchise={franchise} />
        ) : (
          txPaymentMethodsObject[paymentMethod]?.icon
        )}
      </div>
      <div className="transactions-payment-method-number">
        {txPaymentMethodsObject[paymentMethod]?.value ===
        txPaymentMethodsObject["PSE"]?.value
          ? txPaymentMethodsObject["PSE"]?.label
          : `****${transactionReference}`}
      </div>
    </div>
  );
};

export default TransactionPaymentMethod;
