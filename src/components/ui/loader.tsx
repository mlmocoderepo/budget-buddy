import { LoaderProps } from "@/types";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Loader(props: LoaderProps = {}) {
  return (
    <View style={[styles.defaultContainer, props.style]}>
      <ActivityIndicator
        size={props.size || "large"}
        color={props.color || "#000"}
      />
      <Text style={styles.text}>{props.message || "Loading..."}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  defaultContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});
