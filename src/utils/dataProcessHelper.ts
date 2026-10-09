import { WeekAmount } from "@/types";
import { barDataItem } from "react-native-gifted-charts";

export const processWeeklyData = (
  data: WeekAmount[] | null | undefined | [],
  currentDay: Date,
  transactionType: "Income" | "Expense" = "Income",
): barDataItem[] => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const isIncome = transactionType === "Income";

  let barData: barDataItem[] = days.map((label) => ({
    label,
    value: 0,
    frontColor: "#d1d5db",
    gradientColor: "#d1d5db",
  }));

  data?.forEach((item) => {
    // !! Need to ensure thath the item.day of the week is converted to a number
    // !! Otherwise, the value added would be a string
    // !! "4" + 6 becomes 46
    // !! Whereas 4 + 6 becomes 10
    // This obtains the actual day of the week
    const dayIndex = (Number(item.day_of_week) + 6) % 7;

    if (dayIndex >= 0 && dayIndex < 7) {
      barData[dayIndex].value = item.total;

      if (item.total < 100) {
        barData[dayIndex].frontColor = "#d1d5db";
        barData[dayIndex].gradientColor = "#d1d5db";
      } else {
        barData[dayIndex].frontColor = isIncome ? "#d3ff00" : "#ffab00";
        barData[dayIndex].gradientColor = isIncome ? "#12ff00" : "#ff0000";
      }

      // !! Underline the date representing the current day
      if (
        currentDay.toLocaleDateString("en-GB", { weekday: "short" }) ===
          barData[dayIndex].label &&
        currentDay.toLocaleDateString() === new Date().toLocaleDateString()
      ) {
        barData[dayIndex].labelTextStyle = {
          textDecorationLine: "underline",
        };
      }
    }
  });

  return barData;
};
