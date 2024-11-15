import React from "react";
import "./TransactionTableBanner.css";
import useTransactions from "../../../hooks/useTransactions";
import { periodObject } from "../../../utils/periodsObject";
import { startCase } from "lodash";

export type Period = keyof typeof periodObject;

const TransactionTableBanner: React.FC = () => {
  const { filters } = useTransactions();

  const period = filters.period as Period;

  return (
    <div className="transaction-banner">
      <span className="banner-text">{`Tus ventas de ${
        startCase(periodObject[period]?.label) || "Hoy"
      }`}</span>
    </div>
  );
};

export default TransactionTableBanner;
