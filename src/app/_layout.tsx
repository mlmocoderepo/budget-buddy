import Loader from "@/components/ui/loader";
import {
  DB_DIRECTORY,
  DB_NAME,
  deleteExistingDatabase,
  onDatabaseInit,
  prepareDatabase,
} from "@/utils/database";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

const RESET_DATABASE = false;

export default function RootLayout() {
  const [databaseReady, setDatabaseReady] = useState<boolean>(false);
  const [databaseError, setDatabaseError] = useState<Error | null>(null);

  useEffect(() => {
    const setUp = async () => {
      try {
        // CREATE A DELAY FOR TESTING
        // await new Promise((resolve) => setTimeout(resolve, 5000));

        // DELETE THE DATABASE IF true
        if (RESET_DATABASE) await deleteExistingDatabase();

        await prepareDatabase();
        setDatabaseReady(true);
      } catch (error) {
        console.error("Failed to perpare database.");
        setDatabaseError(
          error instanceof Error ? error : new Error("unkown database error"),
        );
      }
    };
    setUp();
  }, []);

  if (databaseError) throw databaseError;

  if (!databaseReady) return null;

  return (
    <Suspense
      fallback={
        <Loader
          style={styles.container}
          message="Loading Data..."
          color="#AAA"
          size={"small"}
        />
      }
    >
      <SQLiteProvider
        databaseName={DB_NAME}
        directory={DB_DIRECTORY.uri}
        onInit={onDatabaseInit}
        useSuspense
      >
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Budget Buddy",
              headerLargeTitleEnabled: true,
            }}
          ></Stack.Screen>
        </Stack>
      </SQLiteProvider>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
