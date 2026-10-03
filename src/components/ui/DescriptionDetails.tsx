import { StyleSheet, Text, View } from "react-native";

export default function DescriptionDetails({
  description,
}: {
  description: string | undefined;
}) {
  return (
    <View>
      <Text style={styles.textDescriptionContainer}>{description ?? "-"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textDescriptionContainer: {
    fontSize: 14,
    fontWeight: "600",
  },
});
