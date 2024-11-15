import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { AppDispatch } from "../store/store";
import { fetchTransactions } from "../store/slices/transactionsSlice";
import { Transaction } from "../interfaces/transactions/transactions";

interface Filters {
  [key: string]: string | number | boolean;
}

const useTransactions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultFilters: Filters = {
    period: "today",
    verTodos: true,
  };

  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [tempFilters, setTempFilters] = useState<Filters>(defaultFilters);
  const [displayedTransactions, setDisplayedTransactions] = useState<
    Transaction[]
  >([]);
  const [allTransactions, setAllTransactions] = useState<
    Record<string, Transaction[]>
  >({});
  const [isLoaded, setIsLoaded] = useState(false);

  const applyDateFilter = (transaction: Transaction, period: string) => {
    const currentDate = new Date();
    let transactionDate = new Date(transaction.createdAt);

    switch (period) {
      case "today":
        return transactionDate.toDateString() === currentDate.toDateString();
      case "week":
        const startOfWeek = currentDate.getDate() - currentDate.getDay();
        const endOfWeek = startOfWeek + 6;
        const weekStart = new Date(currentDate.setDate(startOfWeek));
        const weekEnd = new Date(currentDate.setDate(endOfWeek));
        return transactionDate >= weekStart && transactionDate <= weekEnd;
      case "month":
        return (
          transactionDate.getMonth() === currentDate.getMonth() &&
          transactionDate.getFullYear() === currentDate.getFullYear()
        );
      default:
        return true;
    }
  };

  useEffect(() => {
    setIsLoaded(false);
    dispatch(fetchTransactions())
      .then((response: any) => {
        const allFetchedTransactions = response.payload;
        setAllTransactions({ all: allFetchedTransactions });
        setDisplayedTransactions(allFetchedTransactions);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setDisplayedTransactions([]);
        setIsLoaded(true);
      });
  }, [dispatch]);

  useEffect(() => {
    const loadedFilters: Filters = { ...defaultFilters };
    searchParams.forEach((value, key) => {
      loadedFilters[key] =
        value === "true" ? true : value === "false" ? false : value;
    });

    setFilters(loadedFilters);
    setTempFilters(loadedFilters);
  }, [searchParams]);

  useEffect(() => {
    if (isLoaded) {
      const period = (filters["period"] as string) || "today";

      let filteredTransactions = allTransactions.all.filter(
        (transaction: Transaction) => {
          const isCobroDatafono =
            filters["cobroDatafono"] === true &&
            transaction.salesType === "TERMINAL";
          const isCobroLinkPago =
            filters["cobroLinkPago"] === true &&
            transaction.salesType === "PAYMENT_LINK";
          const isDateFiltered = applyDateFilter(transaction, period);

          if (filters["verTodos"] === true) {
            return isDateFiltered;
          }

          return (isCobroDatafono || isCobroLinkPago) && isDateFiltered;
        }
      );

      setDisplayedTransactions(filteredTransactions);
    }
  }, [filters, isLoaded, allTransactions]);

  const handleFilterChange = (name: string, value: string | boolean) => {
    setTempFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    const newSearchParams = new URLSearchParams();
    Object.entries(tempFilters).forEach(([key, val]) => {
      newSearchParams.append(key, String(val));
    });
    setSearchParams(newSearchParams);
  };

  return {
    filters: tempFilters,
    displayedTransactions,
    handleFilterChange,
    applyFilters,
    isLoaded,
  };
};

export default useTransactions;
