import { Category, Transaction } from "@/types";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import TransactionListItem from "./TransactionListItem";

export default function TransactionList({
  transactions,
  categories,
  deleteTransaction,
}: {
  transactions: Transaction[];
  categories: Category[];
  deleteTransaction: (id: number) => Promise<void>; // takes in a function, returning a promise
}) {
  return (
    <View style={styles.transactionListContainer}>
      {transactions.map((transaction) => {
        const currentTransactionCategory = categories.find(
          (category) => category.id === transaction.category_id,
        );
        return (
          <TouchableOpacity
            key={transaction.id}
            activeOpacity={0.7}
            onLongPress={() => {
              deleteTransaction(transaction.id);
            }}
          >
            <TransactionListItem
              transaction={transaction}
              category={currentTransactionCategory}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  transactionListContainer: {
    gap: 16,
  },
});
