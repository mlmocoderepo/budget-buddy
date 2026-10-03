import { StyleSheet, Text, View } from "react-native";

export default function DateDetails({ date }: { date: number }) {
  const formattedDate = new Date(date * 1000).toDateString();

  return (
    <View>
      <Text style={styles.textDateContainer}>{formattedDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textDateContainer: {
    fontSize: 12,
    fontWeight: "normal",
    color: "gray",
    paddingTop: 6,
  },
});
