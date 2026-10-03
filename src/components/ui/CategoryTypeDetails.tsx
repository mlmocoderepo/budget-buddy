import { StyleSheet, Text, View } from "react-native";

export default function CategoryTypeDetails({
  type,
}: {
  type: string | undefined;
}) {
  return (
    <View>
      <Text
        style={[
          styles.textTypeContainer,
          { color: type === "Income" ? "green" : "red" },
        ]}
      >
        {type ?? "-"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textTypeContainer: {
    fontSize: 12,
    fontWeight: "400",
    paddingBottom: 6,
  },
});
