SELECT
  COUNT(*) AS orders
FROM
  orders
WHERE
  cust_id = 10001;
SELECT
  cust_name,
  cust_state,
  (
    SELECT
      COUNT(*)
    FROM
      orders
    WHERE
      orders.cust_id = customers.cust_id
  ) as orders
FROM
  customers
ORDER BY
  cust_name;