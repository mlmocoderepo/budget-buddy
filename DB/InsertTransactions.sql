-- Expenses
-- February 2024
INSERT INTO Transactions (category_id, amount, date, description) VALUES (1, 100.50, 1709814000, 'Weekly groceries');
INSERT INTO Transactions (category_id, amount, date, description) VALUES (1, 75.25, 1709900400, 'More groceries');
INSERT INTO Transactions (category_id, amount, date, description) VALUES (2, 1200, 1707740400, 'Monthly rent');
INSERT INTO Transactions (category_id, amount, date, description) VALUES (1, 45.99, 1710082800, 'Snacks and drinks');

-- January 2024
INSERT INTO Transactions (category_id, amount, date, description) VALUES (1, 60.00, 1707154800, 'Breakfast supplies');
INSERT INTO Transactions (category_id, amount, date, description) VALUES (1, 110.75, 1707241200, 'Household items');
INSERT INTO Transactions (category_id, amount, date, description) VALUES (2, 50.25, 1707327600, 'Utilities bill');
INSERT INTO Transactions (category_id, amount, date, description) VALUES (1, 200.50, 1707414000, 'Electronics');
INSERT INTO Transactions (category_id, amount, date, description) VALUES (1, 15.99, 1707500400, 'Dining out');

-- December 2023
INSERT INTO Transactions (category_id, amount, date, description) VALUES (1, 90.00, 1704562800, 'Christmas Gifts');
INSERT INTO Transactions (category_id, amount, date, description) VALUES (1, 120.75, 1704649200, 'New Year Party Supplies');

-- November 2023
INSERT INTO Transactions (category_id, amount, date, description) VALUES (1, 85.50, 1701970800, 'Thanksgiving Groceries');
INSERT INTO Transactions (category_id, amount, date, description) VALUES (2, 900, 1702057200, 'Rent November');


-- Income
-- February 2024
INSERT INTO Transactions (category_id, amount, date, description) VALUES (3, 3000, 1709914800, 'Monthly salary');
INSERT INTO Transactions (category_id, amount, date, description) VALUES (4, 500, 1710001200, 'Freelance project');

-- January 2024
INSERT INTO Transactions (category_id, amount, date, description) VALUES (3, 3200, 1707266800, 'Bonus');
INSERT INTO Transactions (category_id, amount, date, description) VALUES (4, 450, 1707353200, 'Consulting work');
INSERT INTO Transactions (category_id, amount, date, description) VALUES (3, 2800, 1707439600, 'Part-time job');
INSERT INTO Transactions (category_id, amount, date, description) VALUES (4, 600, 1707526000, 'Online sales');
INSERT INTO Transactions (category_id, amount, date, description) VALUES (3, 1500, 1707612400, 'Freelance writing');

-- December 2023
INSERT INTO Transactions (category_id, amount, date, description) VALUES (3, 3100, 1704675600, 'End of Year Bonus');

-- November 2023
INSERT INTO Transactions (category_id, amount, date, description) VALUES (4, 700, 1702083600, 'Thanksgiving Freelance');

-- 5. confirm again
select * from Transactions;
-- 1|1|100.5|2023-01-10|Weekly groceries|Expense
-- 2|1|75.25|2023-01-17|More groceries|Expense
-- 3|2|1200.0|2023-01-01|Monthly rent|Expense
-- 4|1|45.99|2023-01-24|Snacks and drinks|Expense
-- 5|3|3000.0|2023-01-15|Monthly salary|Income
-- 6|4|500.0|2023-01-20|Freelance project|Income

-- 6. exit db