import { TransactionsByMonth } from "@/types";
import { StyleSheet, Text, TextStyle } from "react-native";
import Card from "./ui/Card";

export default function TransactionSummary({
  totalExpenses,
  totalIncome,
}: TransactionsByMonth) {
  const readablePeriod = new Date().toLocaleDateString("default", {
    month: "long",
    year: "numeric",
  });

  // Function to determine the style based on the value (positive or negative)
  const getMoneyTextStyle = (value: number): TextStyle => ({
    fontWeight: "bold",
    color: value < 0 ? "#ff4500" : "#2e8b57", // Red for negative, custom green for positive
  });

  // Helper function to format monetary values
  const formatMoney = (value: number) => {
    const absValue = Math.abs(value).toFixed(2);
    return `${value < 0 ? "-" : ""}$${absValue}`;
  };

  const savings = totalIncome - totalExpenses;
  return (
    <Card style={styles.container}>
      <Text style={styles.textProfileTitle}>Summary for {readablePeriod}</Text>
      {/* Income */}
      <Text style={styles.textSummary}>
        Income:{" "}
        <Text style={getMoneyTextStyle(totalIncome)}>
          {formatMoney(totalIncome)}
        </Text>
      </Text>
      {/* Expenses */}
      <Text style={styles.textSummary}>
        Expenses:{" "}
        <Text style={getMoneyTextStyle(totalExpenses)}>
          {formatMoney(totalExpenses)}
        </Text>
      </Text>
      {/* Savings */}
      <Text style={styles.textSummary}>
        Savings:{" "}
        <Text style={getMoneyTextStyle(savings)}>{formatMoney(savings)}</Text>
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    paddingBottom: 7,
  },
  textProfileTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  textSummary: {
    fontSize: 18,
    color: "#333",
    marginTop: 3,
    marginBottom: 5,
  },
});
