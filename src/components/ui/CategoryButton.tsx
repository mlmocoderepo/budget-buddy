import { StyleSheet, Text, TouchableOpacity } from "react-native";

function CategoryButton({
  id,
  title,
  isSelected,
  handleTypeSelected,
  handleCategoryId,
}: {
  id: number;
  title: string;
  isSelected: boolean;
  handleTypeSelected(text: string): void;
  handleCategoryId(index: number): void;
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        handleTypeSelected(title);
        handleCategoryId(id);
      }}
      style={[
        styles.touchableCategoryButton,
        { backgroundColor: isSelected ? "#007BFF20" : "#00000020" },
      ]}
    >
      <Text
        style={[
          styles.touchableCategoryText,
          { color: isSelected ? "#007BFF" : "#000000" },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default CategoryButton;

const styles = StyleSheet.create({
  touchableCategoryButton: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginBottom: 6,
  },
  touchableCategoryText: {
    fontWeight: "600",
    marginLeft: 5,
  },
});
