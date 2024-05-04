import db from "../config/db.js";

const getSales = (req, res) => {
  const q = "SELECT * FROM sales";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};
const getSaleById = (req, res) => {
  const saleId = req.params.id;
  const sql = "SELECT * FROM sales WHERE id = ?";
  db.query(sql, [saleId], (err, result) => {
    if (err) {
      //  console.error("Error fetching sale: ", err);
      res.status(500).json({ error: "Error fetching sale" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: "sale not found" });
      return;
    }
    // console.log("sale fetched successfully");
    res.status(200).json({ sales: result[0] });
  });
};

const addSale = (req, res) => {
  // console.log("data:", req.body);
  const { product_id, quantity_sold } = req.body;

  const sql = "INSERT INTO sales (product_id, quantity_sold) VALUES (?, ?)";
  db.query(sql, [product_id, quantity_sold], (err, result) => {
    if (err) {
      //  console.error("Error adding sales: ", err);
      res.status(500).json({ error: "Error adding sales" });
      return;
    }
    // console.log("Sales added successfully");
    res.status(201).json({ message: "Sales added successfully" });
  });
};
const updateSale = (req, res) => {
  const saleId = req.params.id;
  const { product_id, quantity_sold } = req.body;
  let sql = "UPDATE sales SET ";
  const values = [];
  if (product_id) {
    sql += "product_id = ?, ";
    values.push(product_id);
  }
  if (quantity_sold) {
    sql += "quantity_sold = ?, ";
    values.push(quantity_sold);
  }
  // Remove the last comma and space from the SQL string
  sql = sql.slice(0, -2);
  sql += " WHERE id = ?";

  // Add productId to values array
  values.push(saleId);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating sales: ", err);
      res.status(500).json({ error: "Error updating sales" });
      return;
    }
    // console.log("Sales updated successfully");
    res.status(200).json({ message: "Sales updated successfully" });
  });
};

const deleteSale = (req, res) => {
  const saleId = req.params.id;

  db.query("DELETE FROM sales WHERE id = ?", saleId, (err, result) => {
    if (err) {
      console.error("Error deleting sales: ", err);
      res.status(500).json({ error: "Error deleting product" });
      return;
    }
    // console.log("Sales deleted successfully");
    res.status(200).json({ message: "Sales deleted successfully" });
  });
};
export const SalesController = {
  getSales,
  getSaleById,
  addSale,
  updateSale,
  deleteSale,
};
