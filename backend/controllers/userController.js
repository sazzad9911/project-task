const db = require("../db/connection");

const createUser = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    address,
    cardNumber,
    expiry,
    cvc,
  } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send("Fields are required");
  }

  // Insert the user into the database
  db.query(
    `INSERT INTO users (firstName, lastName, email, password, phone, address, cardNumber, expiry, cvc)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [firstName, lastName, email, password, phone, address, cardNumber, expiry, cvc],
    (err, results) => {
      if (err) {
        return res.status(500).send("Error creating user");
      }

      // Retrieve the inserted row based on the newly generated ID
      const insertedId = results.insertId;
      db.query(
        `SELECT * FROM users WHERE id = ?`,
        [insertedId],
        (err, userResults) => {
          if (err) {
            return res.status(500).send("Error retrieving inserted user");
          }

          // Respond with the inserted user's details
          res.json(userResults[0]); // Return the first row of the results
        }
      );
    }
  );
};

module.exports = { createUser };
