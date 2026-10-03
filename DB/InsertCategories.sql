-- 3. insert data
INSERT INTO Categories (name, type) VALUES ('Groceries', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Rent', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Salary', 'Income');
INSERT INTO Categories (name, type) VALUES ('Freelance', 'Income');
INSERT INTO Categories (name, type) VALUES ('Utilities', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Electronics', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Dining Out', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Breakfast Supplies', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Household Items', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Christmas Gifts', 'Expense');
INSERT INTO Categories (name, type) VALUES ('New Year Party Supplies', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Thanksgiving Groceries', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Bonus', 'Income');
INSERT INTO Categories (name, type) VALUES ('Consulting Work', 'Income');
INSERT INTO Categories (name, type) VALUES ('Part-time Job', 'Income');
INSERT INTO Categories (name, type) VALUES ('Online Sales', 'Income');
INSERT INTO Categories (name, type) VALUES ('Freelance Writing', 'Income');
INSERT INTO Categories (name, type) VALUES ('End of Year Bonus', 'Income');
INSERT INTO Categories (name, type) VALUES ('Thanksgiving Freelance', 'Income');

-- 4. confirm data was inserted
select * from Categories;
-- 1|Groceries|Expense
-- 2|Rent|Expense
-- 3|Salary|Income
-- 4|Freelancing|Income
