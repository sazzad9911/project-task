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
const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Check if both email and password are provided
  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  // Find the user in the database
  db.query(
    `SELECT * FROM users WHERE email = ? AND password = ?`,
    [email,password],
    async (err, results) => {
      if (err) {
        return res.status(500).send("Error retrieving user");
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = results[0];
      res.json(user);
    }
  );
};
module.exports = { createUser,loginUser };
