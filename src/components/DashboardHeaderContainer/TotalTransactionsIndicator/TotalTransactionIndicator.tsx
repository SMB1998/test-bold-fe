import { FC, useState } from "react";
import "./TotalTransactionIndicator.css";
import useTransactions from "../../../hooks/useTransactions";
import useTotalAmount from "../../../hooks/useTotalAmount";
import { formatCurrency } from "../../../utils/formatCurrency";
import { startCase } from "lodash";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Period } from "../../TransactionsTable/TransactionTableBanner/TransactionTableBanner";
import { periodObject } from "../../../utils/periodsObject";
import { useLocation } from "react-router-dom";

const TotalTransactionIndicator: FC = () => {
  const { displayedTransactions } = useTransactions();
  const totalSelledInPeriod = useTotalAmount(displayedTransactions);
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const currentDate = new Date();
  const month = currentDate
    .toLocaleString("default", { month: "long" })
    .toLowerCase();
  const year = currentDate.getFullYear();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const period = searchParams.get("period") as Period;

  const toggleTooltip = () => setTooltipVisible(!isTooltipVisible);

  return (
    <div className="card">
      <div className="card-header">
        <h3>
          {`Total de ventas de ${
            startCase(periodObject[period]?.label) || "Hoy"
          }`}{" "}
        </h3>
        <div className="tooltip-container" onClick={toggleTooltip}>
          <AiOutlineInfoCircle
            size={18}
            style={{ marginLeft: "8px", marginTop: 5, cursor: "pointer" }}
          />
          {isTooltipVisible && (
            <span className="tooltip">
              <strong>Estas son las ventas totales.</strong>
              <br></br> Ventas totales para el periodo de tiempo seleccionado.
              (Si tiene filtros aplicados el total cambia de acuerdo a estos)
            </span>
          )}
        </div>
      </div>
      <div className="card-content">
        <h3>{formatCurrency(totalSelledInPeriod)}</h3>
        <div className="card-footer">
          <h4>{`${startCase(month)}, ${year}`}</h4>
        </div>
      </div>
    </div>
  );
};

export default TotalTransactionIndicator;
