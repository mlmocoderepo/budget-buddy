import { TransactionDetailsProps } from "@/types";
import { View } from "react-native";
import CategoryTypeDetails from "./ui/CategoryTypeDetails";
import DateDetails from "./ui/DateDetails";
import DescriptionDetails from "./ui/DescriptionDetails";

export default function TransactionDetails({
  id,
  styleTransactionDetails,
  description,
  date,
  type,
}: TransactionDetailsProps) {
  return (
    <View key={id} style={[styleTransactionDetails]}>
      <CategoryTypeDetails type={type} />
      <DescriptionDetails description={description} />
      <DateDetails date={date} />
    </View>
  );
}
