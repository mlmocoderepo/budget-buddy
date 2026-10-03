import { AntDesign } from "@react-native-vector-icons/ant-design";
import { StyleSheet, Text, View } from "react-native";

export default function Amount({
  iconName,
  color,
  amount,
}: {
  iconName: "plus" | "minus-circle";
  color: string;
  amount: number;
}) {
  return (
    <View style={styles.viewAmountContainer}>
      <AntDesign
        style={styles.iconContainer}
        name={iconName}
        size={24}
        color={color}
      />
      <Text
        adjustsFontSizeToFit={true}
        numberOfLines={1}
        style={styles.textAmountContainer}
      >
        ${amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewAmountContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
  },
  iconContainer: {
    paddingRight: 8,
  },
  textAmountContainer: {
    fontSize: 32,
    fontWeight: 800,
    maxWidth: "80%",
  },
});
