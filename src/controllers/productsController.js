import db from "../config/db.js";

const getProducts = (req, res) => {
  const q = "SELECT * FROM products";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

const getProductById = (req, res) => {
  const productId = req.params.id;
  const sql = `
    SELECT p.*, 
           JSON_ARRAYAGG(JSON_OBJECT('id', s.id, 'product_id', s.product_id, 'quantity_sold', s.quantity_sold, 'sale_date', s.sale_date)) AS sales
    FROM products p
    LEFT JOIN sales s ON p.id = s.product_id
    WHERE p.id = ?
    GROUP BY p.id, p.name, p.description, p.price, p.quantity`;
  db.query(sql, [productId], (err, result) => {
    if (err) {
      // console.error("Error fetching product: ", err);
      res.status(500).json({ error: "Error fetching product" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    // console.log("Product fetched successfully");
    const product = {
      id: result[0].id,
      name: result[0].name,
      description: result[0].description,
      price: result[0].price,
      quantity: result[0].quantity,
      sales: JSON.parse(result[0].sales),
    };
    res.status(200).json({ product });
  });
};

const addProduct = (req, res) => {
  // console.log("data:", req.body);
  const { name, description, price, quantity } = req.body;

  const sql =
    "INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, description, price, quantity], (err, result) => {
    if (err) {
      //console.error("Error adding product: ", err);
      res.status(500).json({ error: "Error adding product" });
      return;
    }
    // console.log("Product added successfully");
    res.status(201).json({ message: "Product added successfully" });
  });
};
const updateProduct = (req, res) => {
  const productId = req.params.id;
  const { name, description, price, quantity } = req.body;
  let sql = "UPDATE products SET ";
  const values = [];
  if (name) {
    sql += "name = ?, ";
    values.push(name);
  }
  if (description) {
    sql += "description = ?, ";
    values.push(description);
  }
  if (price) {
    sql += "price = ?, ";
    values.push(price);
  }
  if (quantity) {
    sql += "quantity = ?, ";
    values.push(quantity);
  }
  // Remove the last comma and space from the SQL string
  sql = sql.slice(0, -2);
  sql += " WHERE id = ?";

  // Add productId to values array
  values.push(productId);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating product: ", err);
      res.status(500).json({ error: "Error updating product" });
      return;
    }
    //  console.log("Product updated successfully");
    res.status(200).json({ message: "Product updated successfully" });
  });
};

const deleteProduct = (req, res) => {
  const productId = req.params.id;
  //  console.log("productId:", productId);
  db.query("DELETE FROM products WHERE id = ?", productId, (err, result) => {
    if (err) {
      console.error("Error deleting product: ", err);
      res.status(500).json({ error: "Error deleting product" });
      return;
    }
    //  console.log("Product deleted successfully");
    res.status(200).json({ message: "Product deleted successfully" });
  });
};
export const ProductsController = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
