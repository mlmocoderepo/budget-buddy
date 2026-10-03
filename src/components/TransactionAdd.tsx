import { Category, TransactionInput } from "@/types";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Card from "./ui/Card";
import CategoryButton from "./ui/CategoryButton";
import TouchableAddButton from "./ui/TouchableAddButton";

function TransactionAdd({
  insertTransaction,
}: {
  insertTransaction(transactionInput: TransactionInput): Promise<void>;
}) {
  const [isAddingTransaction, setIsAddingTransaction] =
    useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [typeSelected, setTypeSelected] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("Expense");
  const [categoryId, setCategoryId] = useState<number>(1);
  const db = useSQLiteContext();

  // When the currentTab changes, get the categories based on currentTab
  useEffect(() => {
    getCategoryType(currentTab);
  }, [currentTab]);

  // When isAddingTransaction is false, reset all inputs
  useEffect(() => {
    if (!isAddingTransaction) {
      resetInputs();
    }
  }, [isAddingTransaction]);

  //   Set the categories based on the currentTab
  async function getCategoryType(currentTab: number) {
    setCategory(currentTab === 0 ? "Expense" : "Income");
    const type = currentTab === 0 ? "Expense" : "Income";

    const result = await db.getAllAsync<Category>(
      `SELECT * FROM Categories where type = ?`,
      [type],
    );
    setCategories(result);
  }

  async function handlSave() {
    await insertTransaction({
      category_id: categoryId,
      amount: Number(amount),
      date: new Date().getTime() / 1000,
      description,
    });
    handleToggleEntry();
  }

  function handleToggleEntry() {
    setIsAddingTransaction(!isAddingTransaction);
  }

  function handleAmount(text: string) {
    // remove any non-numeric characters before setting the state
    const numericValue = text.replace(/[^0-9/]/g, "");
    setAmount(numericValue);
  }

  function handleDescription(text: string) {
    setDescription(text);
  }

  function handleType(index: number) {
    setCurrentTab(index);
  }

  function handleTypeSelected(text: string) {
    setTypeSelected(text);
  }

  function handleCategoryId(index: number) {
    setCategoryId(index);
  }

  function resetInputs() {
    setAmount("");
    setDescription("");
    setCategory("Expense");
    setCategoryId(1);
    setCurrentTab(0);
    setTypeSelected("");
  }

  return (
    <View style={styles.containerMB}>
      {isAddingTransaction ? (
        <View>
          <Card>
            <TextInput
              placeholder="$Amount"
              style={styles.txtInputAmount}
              keyboardType="numeric"
              onChangeText={(text) => {
                handleAmount(text);
              }}
            />
            <TextInput
              placeholder="Description"
              style={styles.textInputDescription}
              onChangeText={(text) => {
                handleDescription(text);
              }}
            />
            <Text style={styles.containerMB}>Select entry type:</Text>
            <SegmentedControl
              values={["Expense", "Income"]}
              style={styles.containerMB}
              selectedIndex={currentTab}
              onChange={(event) => {
                handleType(event.nativeEvent.selectedSegmentIndex);
              }}
            />
            {categories.map((cat) => (
              <CategoryButton
                key={cat.id}
                id={cat.id}
                title={cat.name}
                isSelected={typeSelected === cat.name}
                handleTypeSelected={(text) => {
                  handleTypeSelected(text);
                }}
                handleCategoryId={handleCategoryId}
              ></CategoryButton>
            ))}
            <View style={styles.buttonContainer}>
              <Button title="Cancel" color={"red"} onPress={handleToggleEntry}>
                {/* Save Tranaction */}
              </Button>
              <Button title="Save" color={"green"} onPress={handlSave}>
                {/* Save Tranaction */}
              </Button>
            </View>
          </Card>
        </View>
      ) : (
        <TouchableAddButton toggleEntry={handleToggleEntry} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerMB: {
    marginBottom: 15,
  },
  txtInputAmount: {
    fontSize: 32,
    marginBottom: 15,
    fontWeight: "light",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#00000040",
    padding: 10,
  },
  textInputDescription: {
    marginBottom: 15,
    fontWeight: "light",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#00000040",
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default TransactionAdd;
