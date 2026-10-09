import { PropsWithChildren } from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface Category {
  id: number;
  name: string;
  type: "Expense" | "Income";
}

// !! For displaying transactions
export interface Transaction {
  id: number;
  category_id: number;
  amount: number;
  date: number;
  description: string;
  type: "Expense" | "Income";
}

// !! For submitting transactions (do not have id nor type)
export type TransactionInput = Partial<Transaction> & {
  category_id: number;
  amount: number;
  date: number;
  description: string;
};

export interface LoaderProps {
  style?: StyleProp<ViewStyle>; // optional style for View component (best practice when written this way)
  message?: string; // optonal message
  color?: string; // optional color
  size?: "small" | number; // optional size
}

export interface TransactionListItemProps {
  transaction: Transaction;
  category?: Category | null | undefined;
}

export interface CardProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

export interface TransactionDetailsProps {
  styleTransactionDetails: StyleProp<ViewStyle>;
  id: number;
  description?: string;
  date: number;
  type?: string;
}

export interface TransactionsByMonth {
  totalExpenses: number;
  totalIncome: number;
  targetMonth?: number | null | undefined;
  targetYear?: number | null | undefined;
}

// !! Duration of data to fetch from
export enum Period {
  week = "week",
  month = "month",
  year = "year",
}

// !! Start and end date on the data to fetch
export interface WeekRange {
  startDate: number;
  endDate: number;
}
export interface WeekAmount {
  day_of_week: number;
  total: number;
}
