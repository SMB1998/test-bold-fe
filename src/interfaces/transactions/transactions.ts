export interface Transaction {
  id: string;
  status: string;
  paymentMethod: string;
  salesType: string;
  transactionReference: number;
  amount: number;
  deduction?: number;
  franchise?: string;
  createdAt: number;
  [key: string]: any;
}
