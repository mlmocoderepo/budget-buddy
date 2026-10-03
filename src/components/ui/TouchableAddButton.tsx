import AntDesign from "@react-native-vector-icons/ant-design";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

function TouchableAddButton({ toggleEntry }: { toggleEntry(): void }) {
  return (
    <TouchableOpacity style={styles.touchableEntry} onPress={toggleEntry}>
      <AntDesign style={styles.touchableEntryIcon} name={"plus"} size={24} />
      <Text style={styles.touchableEntryText}>New Entry</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableEntry: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007BFF20",
    borderRadius: 15,
  },
  touchableEntryText: {
    fontWeight: 400,
    fontSize: 20,
    paddingLeft: 5,
    color: "#007BFF",
  },
  touchableEntryIcon: {
    fontSize: 24,
    color: "#007BFF",
  },
});

export default TouchableAddButton;
