-- SELECT
--   order_num
-- FROM
--   orderitems
-- WHERE
--   prod_id = 'TNT2';
-- SELECT
--   cust_id
-- FROM
--   orders
-- WHERE
--   order_num in (20005, 20007);
SELECT
  cust_id
FROM
  orders
WHERE
  order_num IN (
    SELECT
      order_num
    FROM
      orderitems
    WHERE
      prod_id = 'TNT2'
  );
-- SELECT
  --   cust_name,
  --   cust_contact
  -- FROM
  --   customers
  -- WHERE
  --   cust_id in (10001, 10004);
SELECT
  cust_name,
  cust_contact
FROM
  customers
WHERE
  cust_id in (
    SELECT
      cust_id
    FROM
      orders
    WHERE
      order_num IN (
        SELECT
          order_num
        FROM
          orderitems
        WHERE
          prod_id = 'TNT2'
      )
  );