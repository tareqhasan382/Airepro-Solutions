import db from "../config/db.js";

async function CornJob(data) {
  try {
    const sql = "INSERT INTO sales (product_id, quantity_sold) VALUES (?, ?)";

    data.forEach(async (item) => {
      try {
        await new Promise((resolve, reject) => {
          db.query(
            sql,
            [item.product_id, item.quantity_sold],
            (err, result) => {
              if (err) {
                console.error("Error inserting sales data: ", err);
                reject(err);
              } else {
                console.log("Sales data inserted successfully");
                resolve(result);
              }
            }
          );
        });
      } catch (error) {
        console.error("Error inserting sales data: ", error);
        // Handle error here, such as logging to a designated log file
      }
    });
  } catch (error) {
    throw new Error("Error inserting data into database: ", error);
  }
}

export default CornJob;
