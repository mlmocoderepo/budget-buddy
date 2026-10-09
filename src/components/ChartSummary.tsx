import { Period, WeekAmount, WeekRange } from "@/types";
import { processWeeklyData } from "@/utils/dataProcessHelper";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useSQLiteContext } from "expo-sqlite";
import { SymbolView } from "expo-symbols";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BarChart, barDataItem } from "react-native-gifted-charts";
import Card from "./ui/Card";

export default function ChartSummary({
  getTransactionsByMonth,
}: {
  getTransactionsByMonth(
    targetMonth?: number | null,
    targetYear?: number | null,
  ): Promise<void>;
}) {
  const db = useSQLiteContext();
  const [chartData, setChartData] = useState<barDataItem[]>([]);
  const [chartKey, setChartKey] = useState<number>(0);
  const [chartPeriod, setChartPeriod] = useState<Period>(Period.week);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentEndDate, setCurrentEndDate] = useState<Date>(new Date());
  const [startRangeDate, setStartRangeDate] = useState<string>("");
  const [endRangeDate, setEndRangeDate] = useState<string>("");
  const [transactionType, setTransactionType] = useState<"Income" | "Expense">(
    "Income",
  );

  const getWeekRange = (date: Date): WeekRange => {
    // 1. Obtain the inputs date so we DO NOT CHANGE the original object outside the function
    const baseDate = new Date(date.getTime());

    // 2. Get the JavaScript day by index (0 = Sun, 1 = Mon, ... 6 = Sat)
    const day = baseDate.getDay();

    // 3. Calc. how many days to subtract to get back to Mon
    // If day is 0 (Sun), we go back by 6 days
    // If day is 2 (Wed) or others, then we minus 1 day (since Sun starts from 0)
    const daysSinceMonday = day === 0 ? 6 : day - 1;

    // Find start of the week (Monday)
    const startOfWeek = new Date(baseDate);
    startOfWeek.setDate(baseDate.getDate() - daysSinceMonday);

    // 3. Find the end of week (Sunday) by adding 6 days to Monday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    // 4. Return the start and end date
    // IMPORTANT: convert in milliseconds to SECONDS
    return {
      startDate: Math.floor(startOfWeek.getTime() / 1000),
      endDate: Math.floor(endOfWeek.getTime() / 1000),
    };
  };

  const getWeeklyValue = (data: barDataItem[]) => {
    // !! object.reduce ((accumulator, currentValue) => accumulator + currentValue, initialValue)
    const sum = data.reduce(
      (accumulator, item) => accumulator + (Number(item.value) || 0),
      0,
    );
    return sum.toFixed(2);
  };

  const fetchWeeklyData = async (
    startDate: number,
    endDate: number,
    type: "Income" | "Expense",
  ) => {
    try {
      const query = `
            SELECT 
            strftime('%w', t.date, 'unixepoch') AS day_of_week,
            SUM(amount) AS total
            FROM Transactions t 
            JOIN Categories c
            ON t.category_id = c.id
            WHERE date >= ? 
            AND date <= ? AND type = ?
            GROUP BY day_of_week
            ORDER BY day_of_week ASC 
        `;

      const result = await db.getAllAsync<WeekAmount>(query, [
        startDate,
        endDate,
        type,
      ]);

      return result;
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (chartPeriod === Period.week) {
        const { startDate, endDate } = getWeekRange(currentDate);

        // !! ensure the data is set to milliseconds
        setCurrentEndDate(new Date(endDate * 1000));

        // !! set the Range date
        const options: Intl.DateTimeFormatOptions = {
          day: "numeric",
          month: "short",
          year: "2-digit",
        };
        setStartRangeDate(
          new Date(startDate * 1000).toLocaleDateString("en-GB", options),
        );
        setEndRangeDate(
          new Date(endDate * 1000).toLocaleDateString("en-GB", options),
        );

        // 1. get the data
        const data = await fetchWeeklyData(startDate, endDate, transactionType);

        // update chart data
        setChartData(processWeeklyData(data, currentDate, transactionType));
        setChartKey((prev) => prev + 1);
      }
    };
    fetchData();
  }, [currentDate, chartPeriod, transactionType]);

  const handlePreviousWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
    getTransactionsByMonth(currentDate.getMonth(), currentDate.getFullYear());
  };

  const handleNextWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
    getTransactionsByMonth(currentDate.getMonth(), currentDate.getFullYear());
  };

  return (
    <Card style={styles.barChartContainer}>
      <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: "bold" }}>
        {`${startRangeDate} - ${endRangeDate}`}
      </Text>
      <Text style={{ color: "gray" }}>
        Total {transactionType === "Expense" ? "Spending" : "Income"}:
      </Text>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "condensedBold",
          marginBottom: 16,
        }}
      >
        ${getWeeklyValue(chartData)}
      </Text>
      <BarChart
        key={chartKey}
        data={chartData}
        width={290}
        height={200}
        minHeight={0}
        barWidth={20}
        barBorderRadius={5}
        // gradientColor={"green"}
        // showGradient={true}
        spacing={20}
        noOfSections={5}
        xAxisThickness={0}
        yAxisThickness={0}
        xAxisLabelTextStyle={{ color: "gray" }}
        yAxisTextStyle={{ color: "gray" }}
        isAnimated
        animationDuration={400}
        showGradient
        dashGap={10}
      />
      <View
        style={{
          paddingVertical: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={handlePreviousWeek}
        >
          <SymbolView
            name="chevron.left"
            size={40}
            type={"hierarchical"}
            tintColor={"gray"}
          />
          <Text style={{ marginTop: 10, fontWeight: "light", fontSize: 12 }}>
            Prev Week
          </Text>
        </TouchableOpacity>
        <SegmentedControl
          style={{ height: 40, width: 180 }}
          values={["Income", "Expense"]}
          selectedIndex={transactionType === "Income" ? 0 : 1}
          onChange={(event) => {
            const index = event.nativeEvent.selectedSegmentIndex;
            setTransactionType(index === 0 ? "Income" : "Expense");
          }}
        />
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={handleNextWeek}
        >
          <SymbolView
            name="chevron.right"
            size={40}
            type={"hierarchical"}
            tintColor={"gray"}
          />
          <Text style={{ marginTop: 10, fontWeight: "light", fontSize: 12 }}>
            Next Week
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  barChartContainer: {
    marginBottom: 15,
  },
});
