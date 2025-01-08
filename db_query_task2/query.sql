-- Write a query to fetch products with a price between $50 and $200, ordered by price (ascending), with pagination (10 products per page).

-- 1) USING SQL
SELECT id, name, category, price, quantity 
FROM products
WHERE price BETWEEN 50 AND 200
ORDER by price -- Order is Ascending by default
LIMIT 10 
OFFSET 0;

-- 2) USING NOSQL
db.products.find(
  {price: {$gte: 50, $lte: 200}}
)
.sort({price: 1})
.skip(0).limit(10);

-- Write a query to retrieve products by category (e.g., "Electronics"), sorted by price in descending order. Limit the result to 5 products per page.

-- 1) USING SQL
SELECT id, name, category, price, quantity 
FROM products
WHERE category = "Electronics"
ORDER by price DESC
LIMIT 5 
OFFSET 0;

-- 2) USING NOSQL
db.products.find({category: "Electronics"})
  .sort({price: -1})
  .skip(0).limit(5);


-- How would you optimize the queries for high traffic scenarios?
  -- To optimize the query you can use indexing 
    sql => CREATE INDEX category_index ON products(category, price DESC);
    nosql => db.products.createIndex({category: 1, price: -1});
  -- you can also use cashing as redis