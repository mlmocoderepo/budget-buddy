import TransactionAdd from "@/components/TransactionAdd";
import TransactionList from "@/components/TransactionList";
import TransactionSummary from "@/components/TransactionSummary";
import {
  Category,
  Transaction,
  TransactionInput,
  TransactionsByMonth,
} from "@/types";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function Index() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsByMonth, setTransactionsByMonth] =
    useState<TransactionsByMonth>({
      // or literal object: {totalExpenses: number, totalIncome: number}
      totalExpenses: 0,
      totalIncome: 0,
    });

  const db = useSQLiteContext();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Execute both queries simultaneously (in parallel)
        // db.WithTransactionAsync is not used as the queries are only read ops
        await Promise.all([
          getTransactionData(),
          getCategoriesData(),
          getTransactionsByMonth(),
        ]);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };
    loadData();
  }, []);

  async function getTransactionData() {
    try {
      // The returned results should be type Transaction (TS generic)
      // The query here has been modified to use INNER JOIN
      const result: Transaction[] = await db.getAllAsync<Transaction>(`
        SELECT 
        t.id as 'id', 
        t.category_id as 'category_id', 
        t.amount as 'amount', 
        t.date as 'date', 
        t.description as 'description', 
        c.type as 'type' 
        FROM Transactions t JOIN Categories c
        ON t.category_id = c.id
        ORDER BY date DESC;
        `);

      setTransactions(result);
    } catch (error) {
      console.log("Failed to fetch errors: ", error);
    }
  }

  async function getCategoriesData() {
    try {
      const result: Category[] = await db.getAllAsync<Category>(
        `SELECT * FROM categories;`,
      );

      setCategories(result);
    } catch (error) {
      console.log("Failed to fetch categories: ", error);
    }
  }

  async function deleteTransaction(id: number) {
    try {
      await db.withTransactionAsync(async () => {
        // 1. Pass the id to delete as a parameterised query to prevent SQL injection
        const result = await db.runAsync(
          `DELETE FROM Transactions WHERE id = ?;`,
          [id],
        );

        // 2. If the row is indeed deleted, getTransactionData() to update the data
        if (result.changes > 0) {
          await Promise.all([
            getTransactionData(),
            getCategoriesData(),
            getTransactionsByMonth(),
          ]);
        } else {
          // Implement message, id not found
        }
      });
    } catch (error) {
      console.log("Failed to delete transaction: ", error);
    }
  }

  async function getTransactionsByMonth() {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();

      // Set to the first day of the current month
      const startMonth = new Date(year, month, 1);

      // Get the first day of the next month
      const endMonth = new Date(year, month + 1, 1);

      // Then subtract by 1 ms to get the end of the current month
      endMonth.setMilliseconds(endMonth.getMilliseconds() - 1);

      // Convert to Unix TimeStamp (seconds)
      const startOfMonthTimeStamp = Math.floor(startMonth.getTime() / 1000);
      const endOfMonthTimeStamp = Math.floor(endMonth.getTime() / 1000);

      const transactionByMonth = await db.getAllAsync<TransactionsByMonth>(
        `
      SELECT 
      COALESCE(SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END), 0) AS totalExpenses, 
      COALESCE(SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END), 0) AS totalIncome
      FROM (
        SELECT 
        t.id AS id, 
        t.category_id AS category_id, 
        t.amount AS amount, 
        t.date AS date, 
        t.description AS description, 
        c.type AS type 
        FROM Transactions t JOIN Categories c
        ON t.category_id = c.id
      ) AS result
      WHERE date >= ? AND date <= ?;
    `,
        [startOfMonthTimeStamp, endOfMonthTimeStamp],
      );

      setTransactionsByMonth(transactionByMonth[0]);
    } catch (error) {
      console.log("Failed to fetch errors: ", error);
    }
  }

  async function insertTransaction(transactionInput: TransactionInput) {
    try {
      db.withTransactionAsync(async () => {
        const result = await db.runAsync(
          // 1. Pass the id to delete as a parameterised query to prevent SQL injection
          `INSERT INTO Transactions (amount, description, category_id, date) VALUES (?, ?, ?, ?)`,
          [
            transactionInput.amount,
            transactionInput.description,
            transactionInput.category_id,
            transactionInput.date,
          ],
        );

        if (result.changes > 0) {
          await Promise.all([
            getTransactionData(),
            getCategoriesData(),
            getTransactionsByMonth(),
          ]);
        } else {
          // Implement message, id not found
          console.log("Nothing added");
        }
      });
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <TransactionSummary
        totalExpenses={transactionsByMonth.totalExpenses}
        totalIncome={transactionsByMonth.totalIncome}
      />
      <TransactionAdd insertTransaction={insertTransaction} />
      <TransactionList
        transactions={transactions}
        categories={categories}
        deleteTransaction={deleteTransaction}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    padding: 15,
    paddingTop: 170,
    paddingBottom: 50,
  },
});
