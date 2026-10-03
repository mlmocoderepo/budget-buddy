import { Asset } from "expo-asset";
import { Directory, File, Paths } from "expo-file-system";
import * as SQLite from "expo-sqlite";

// !! 1. Common DB name and directory exported
export const DB_NAME = "budgetBuddyDB.db";
export const DB_DIRECTORY = new Directory(Paths.document, "SQLite");

// !! 2. Returns the common database file in the system used across the app
export function getDatabaseFile() {
  // The application database is explicitly:
  // Paths.document/SQLite/budgetbuddyDB.db
  return new File(DB_DIRECTORY, DB_NAME);
}

// !! 3. Create a connection to the database
export async function openDatabase() {
  return SQLite.openDatabaseAsync(DB_NAME, {}, DB_DIRECTORY.uri);
}

// !! 4. Prepare and create the database if it does not exist
// !! 4.1. And load a copy of the database to the designated system directory from assets folder
export async function prepareDatabase() {
  // 1. Make sure SQLite directory exists
  if (!DB_DIRECTORY.exists) DB_DIRECTORY.create({ intermediates: true });

  // 2. Obtain the database file
  const dbFile = getDatabaseFile();

  // 3. identify the location of where the local copy of the db is
  const dbAsset = require(`../../assets/${DB_NAME}`);
  const [assetInstance] = await Asset.loadAsync(dbAsset);
  const localUri = assetInstance.localUri || assetInstance.uri;
  if (!localUri) throw new Error("Could not resolve asset uri");

  // 4. Verify and copy the database into the file system
  if (!dbFile.exists) {
    const assetFile = new File(localUri);
    await assetFile.copy(dbFile);

    console.log("Database initialised successfully!");
  } else {
    console.log("Database already exists.");
  }
}

// !! 5. Invoked to check that initial database and expected database path are the same
/**
 * Refers to the database used in the program
 * @param db The database should point to the same directory
 */
export async function onDatabaseInit(db: SQLite.SQLiteDatabase) {
  console.log("SQLite database path: ", db.databasePath);
  console.log("Expected database path: ", getDatabaseFile().uri);
}

// !! Delete the existing database
export async function deleteExistingDatabase() {
  try {
    const dbFile = getDatabaseFile();

    if (dbFile.exists) {
      dbFile.delete();
      console.log("Database deleted.");
    } else {
      console.log("No database exists:", dbFile.uri);
    }
  } catch (error) {
    console.error("Failed to delete database:", error);
    throw error;
  }
}
