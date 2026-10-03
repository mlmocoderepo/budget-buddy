-- 1. create DB first in the terminal
-- sqlite3 budgetBuddyDB.db

-- 2. create tables
CREATE TABLE IF NOT EXISTS Categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Expense', 'Income'))
);

CREATE TABLE IF NOT EXISTS Transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER,
  amount REAL NOT NULL,
  date INTEGER NOT NULL,
  description TEXT,
  FOREIGN KEY (category_id) REFERENCES Categories (id)
 );

-- No effect
-- .quit