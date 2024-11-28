const db = require("../db/connection");

const createQuote = (req, res) => {
  const {
    address,
    area,
    budget,
    image1,
    image2,
    image3,
    image4,
    image5,
    customerNote,
  } = req.body;
  const user = req.user;

  if (
    !address ||
    !area ||
    !budget ||
    !image1 ||
    !image2 ||
    !image3 ||
    !image4 ||
    !image5 ||
    !customerNote
  ) {
    return res.status(400).send("Fields are required");
  }

  // Insert the quote into the database
  db.query(
    `INSERT INTO quotes (address, area, budget, image1, image2, image3, image4, image5, customerNote,userId)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
    [
      address,
      area,
      budget,
      image1,
      image2,
      image3,
      image4,
      image5,
      customerNote,
      user.id,
    ],
    (err, results) => {
      if (err) {
        return res.status(500).send("Error creating quotes");
      }

      // Retrieve the inserted row based on the newly generated ID
      const insertedId = results.insertId;
      db.query(
        `SELECT * FROM quotes WHERE id = ?`,
        [insertedId],
        (err, userResults) => {
          if (err) {
            return res.status(500).send("Error retrieving inserted quote");
          }

          // Respond with the inserted quote's details
          res.json(userResults[0]); // Return the first row of the results
        }
      );
    }
  );
};
const updateQuote = (req, res) => {
  const {
    address,
    area,
    budget,
    image1,
    image2,
    image3,
    image4,
    image5,
    customerNote,
    id,
  } = req.body;
  const user = req.user;

  if (
    !address ||
    !area ||
    !budget ||
    !image1 ||
    !image2 ||
    !image3 ||
    !image4 ||
    !image5 ||
    !customerNote ||
    !id
  ) {
    return res.status(400).send("Fields are required");
  }

  // Insert the quote into the database
  db.query(
    `UPDATE quotes SET address = ?, area = ?, budget = ?, image1 = ?, image2 = ?, image3 = ?, image4 = ?, image5 = ?, customerNote = ?,status=? WHERE id = ?`,
    [
      address,
      area,
      budget,
      image1,
      image2,
      image3,
      image4,
      image5,
      customerNote,
      "PENDING",
      id,
    ],
    (err, results) => {
      if (err) {
        return res.status(500).send("Error updating quotes");
      }

      db.query(
        `SELECT * FROM quotes WHERE id = ?`,
        [id],
        (err, userResults) => {
          if (err) {
            return res.status(500).send("Error retrieving inserted quote");
          }

          // Respond with the inserted quote's details
          res.json(userResults[0]); // Return the first row of the results
        }
      );
    }
  );
};
const deleteByUser = (req, res) => {
  const { id } = req.query;
  const user = req.user;
  if (!id) {
    return res.status(400).send("Fields are required");
  }
  db.query(
    "DELETE FROM quotes WHERE id = ? AND userId = ?",
    [id, user.id],
    (err, result) => {
      if (err) {
        return res.status(500).send("Error deleting quote");
      }
      res.json(result);
    }
  );
};
const acceptByUser = (req, res) => {
  const { id } = req.body;
  const user = req.user;
  if (!id) {
    return res.status(400).send("Fields are required");
  }
  db.query(
    "UPDATE quotes SET status = ?,ordered = ? WHERE id = ? AND userId = ?",
    ["ACCEPTED", true, id, user.id],
    (err, result) => {
      if (err) {
        return res.status(500).send("Error accepting quote");
      }
      res.json(result);
    }
  );
};
const rejectByUser = (req, res) => {
  const { id, customerNote } = req.body;
  const user = req.user;
  if (!id || !customerNote) {
    return res.status(400).send("Fields are required");
  }
  db.query(
    "UPDATE quotes SET status = ?, customerNote = ? WHERE id = ? AND userId = ?",
    ["REJECT", customerNote, id, user.id],
    (err, result) => {
      if (err) {
        return res.status(500).send("Error rejecting quote");
      }
      res.json(result);
    }
  );
};
const acceptByAdmin = (req, res) => {
  const { id, offerPrice, startDate, endDate } = req.body;
  const user = req.user;
  if (!user?.isAdmin) {
    return res.status(400).send("Admin is required");
  }
  if (!id || !offerPrice || !startDate || !endDate) {
    return res.status(400).send("Fields are required!");
  }
  db.query(
    "UPDATE quotes SET status = ?, offerPrice = ?,startDate=?,endDate=? WHERE id = ?",
    [
      "ACCEPTED",
      offerPrice,
      new Date(startDate).toISOString().slice(0, 19).replace("T", " "),
      new Date(endDate).toISOString().slice(0, 19).replace("T", " "),
      id,
    ],
    (err, result) => {
      if (err) {
        
        return res.status(500).send("Error accepting quote");
      }
      res.json(result);
    }
  );
};
const rejectByAdmin = (req, res) => {
  const { id, adminNote } = req.body;
  const user = req.user;
  if (!user?.isAdmin) {
    return res.status(400).send("Admin is required");
  }
  if (!id || !adminNote) {
    return res.status(400).send("Fields are required!");
  }
  db.query(
    "UPDATE quotes SET status = ?, adminNote = ? WHERE id = ?",
    ["REJECTED", adminNote, id],
    (err, result) => {
      if (err) {
        return res.status(500).send("Error rejecting quote");
      }
      res.json(result);
    }
  );
};
const getUserOrders = (req, res) => {
  const { type } = req.query;
  const user = req.user;
  db.query(
    "SELECT * FROM quotes WHERE ordered=? AND paid=? AND userId=? ORDER BY update_at DESC",
    [
      type === "dashboard" ? false : true,
      type === "payment" ? true : false,
      user.id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).send("Error rejecting quote");
      }
      res.json(result);
    }
  );
};
const getAdminOrders = (req, res) => {
  const { type } = req.query;
  const user = req.user;
  if (!user?.isAdmin) {
    return res.status(400).send("Admin is required");
  }
  db.query(
    "SELECT * FROM quotes WHERE ordered=? AND paid=? ORDER BY update_at DESC",
    [
      type === "dashboard" ? false : true,
      type === "payment" ? true : false,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).send("Error rejecting quote");
      }
      res.json(result);
    }
  );
};
module.exports = {
  createQuote,
  updateQuote,
  deleteByUser,
  acceptByUser,
  rejectByUser,
  acceptByAdmin,
  rejectByAdmin,
  getUserOrders,
  getAdminOrders
};
