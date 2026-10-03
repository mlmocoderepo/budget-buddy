import { categoryColors, categoryEmojis } from "@/constants";
import { TransactionListItemProps } from "@/types";
import { StyleSheet, View } from "react-native";
import TransactionDetails from "./TransactionDetails";
import Amount from "./ui/Amount";
import { default as Card } from "./ui/Card";
import Category from "./ui/Category";

export default function TransactionListItem({
  transaction,
  category,
}: TransactionListItemProps) {
  const iconName = transaction.type === "Expense" ? "minus-circle" : "plus";
  const color = transaction.type === "Expense" ? "red" : "green";
  const categoryColor =
    categoryColors[category?.name ?? "Default"] ?? categoryColors["Default"];
  const emoji =
    categoryEmojis[category?.name ?? "Default"] ?? categoryEmojis["Default"];

  return (
    <Card>
      <View style={styles.listItemViewContainer}>
        <View style={styles.viewTransactionItem}>
          <Amount
            iconName={iconName}
            color={color}
            amount={transaction.amount}
          />
          <Category
            name={category?.name}
            categoryColor={categoryColor}
            emoji={emoji}
          />
        </View>
        <TransactionDetails
          id={transaction.id}
          styleTransactionDetails={styles.transactionDetailsItem}
          description={transaction.description}
          date={transaction.date}
          type={transaction.type}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  listItemViewContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  viewTransactionItem: {
    flexDirection: "column",
    width: "50%",
    height: "100%",
    paddingRight: 10,
  },
  transactionDetailsItem: {
    flexDirection: "column",
    maxWidth: "50%",
    height: "100%",
    borderLeftWidth: 2,
    borderLeftColor: "#AAAAAA" + 50,
    paddingLeft: 10,
  },
  textCategoryItem: {},
});
