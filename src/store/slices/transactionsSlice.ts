import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../../interfaces/transactions/transactions";

interface TransactionsState {
  transactions: Transaction[]; 
  status: "idle" | "loading" | "succeeded" | "failed";
  page: number;
  filters: {
    paymentMethod: string; 
  };
  error: string | null;
}

const API_URL = "https://bold-fe-api.vercel.app/api"; 

const initialState: TransactionsState = {
  transactions: [],
  status: "idle", 
  page: 1,
  filters: {
    paymentMethod: "", 
  },
  error: null,
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();

    return data.data; 
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.filters.paymentMethod = action.payload;
    },
    persistState: (state) => {
      localStorage.setItem("transactionsState", JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchTransactions.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.status = "succeeded";
          state.transactions = action.payload;
        }
      )
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch transactions";
      });
  },
});

export const { setPage, setPaymentMethod, persistState } =
  transactionsSlice.actions;

export default transactionsSlice.reducer;
