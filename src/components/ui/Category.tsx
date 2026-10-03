import { StyleSheet, Text, View } from "react-native";

export default function Category({
  name,
  categoryColor,
  emoji,
}: {
  name: string | undefined;
  categoryColor: string;
  emoji: string;
}) {
  return (
    <View
      style={[
        {
          backgroundColor: categoryColor ? categoryColor + 70 : "#AAA",
        },
        styles.viewNameContainer,
      ]}
    >
      <Text style={styles.textNameContainer}>
        {emoji} {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textNameContainer: {
    fontSize: 14,
    fontWeight: "light",
  },
  viewNameContainer: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: "flex-start",
    marginTop: 6,
  },
});
