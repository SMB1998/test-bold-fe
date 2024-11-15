import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./TransactionsPerdiosTabs.css";
import { startCase } from "lodash";

const TransactionsPerdiosTabs: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPeriod, setSelectedPeriod] = useState<string>("today");

  const currentMonth = new Date().toLocaleString("es-ES", { month: "long" });

  useEffect(() => {
    const period = searchParams.get("period");

    if (period) {
      setSelectedPeriod(period);
    } else {
      // Si no hay un `period` en la URL, se establece "today" en `searchParams`
      setSearchParams({ period: "today" });
      setSelectedPeriod("today");
    }
  }, [searchParams, setSearchParams]);

  const handleTabChange = (period: string) => {
    setSearchParams({ ...Object.fromEntries(searchParams), period });
    setSelectedPeriod(period);
  };

  return (
    <div className="tabs-container">
      <button
        className={`tab ${selectedPeriod === "today" ? "selected" : ""}`}
        onClick={() => handleTabChange("today")}
      >
        Hoy
      </button>
      <button
        className={`tab ${selectedPeriod === "week" ? "selected" : ""}`}
        onClick={() => handleTabChange("week")}
      >
        Esta semana
      </button>
      <button
        className={`tab ${selectedPeriod === "month" ? "selected" : ""}`}
        onClick={() => handleTabChange("month")}
      >
        {startCase(currentMonth.toLocaleLowerCase())}
      </button>
    </div>
  );
};

export default TransactionsPerdiosTabs;
