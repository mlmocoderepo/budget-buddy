import { CardProps } from "@/types";
import { StyleSheet, View } from "react-native";

export default function Card({ children, style = {} }: CardProps) {
  return <View style={[styles.cardContainer, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: "white",
    elevation: 8,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
  },
});
