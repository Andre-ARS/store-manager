USE `Store_Manager`;

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE `products`;
TRUNCATE TABLE `sales`;
TRUNCATE TABLE `sales_products`;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `Store_Manager`.products (name) VALUES
    ("Martelo de Thor"),
    ("Traje de encolhimento"),
    ("Escudo do Capitão América");

INSERT INTO `Store_Manager`.sales (date) VALUES
    (NOW()),
    (NOW());

INSERT INTO `Store_Manager`.sales_products (sale_id, product_id, quantity) VALUES
    (1, 1, 5),
    (1, 2, 10),
    (2, 3, 15);