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
    [
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      cardNumber,
      expiry,
      cvc,
    ],
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
    [email, password],
    async (err, results) => {
      if (err) {
        return res.status(500).send("Error retrieving user");
      }

      if (results.length === 0) {
        return res.status(401).send("Invalid email or password");
      }

      const user = results[0];
      res.json(user);
    }
  );
};
const bigClients = async (req, res) => {
  try {
    // Query to get orders for David Smith
    const result = await db.query(
      `
      SELECT q.userId,u.firstName,u.lastName,u.phone,u.address,u.created_at, COUNT(q.id) AS order_count
      FROM quotes q
      JOIN users u ON q.userId = u.id
      WHERE q.paid = ?
      ORDER BY order_count DESC
    `,
      [true]
    );

    // Find the maximum order count
    const maxOrders = result[0]?.order_count;

    // Find the clients with the maximum order count
    const topClients = result.filter((r) => r.order_count === maxOrders) || [];

    res.json(topClients);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting big clients");
  }
};
const difficultClients = async (req, res) => {
  try {
    // Query to get orders for David Smith
    const result = await db.query(
      `
      SELECT 
    q.userId,
    u.firstName,
    u.lastName,
    u.phone,
    u.address,
    u.created_at, 
    COUNT(q.id) AS order_count
FROM 
    quotes q
JOIN 
    users u ON q.userId = u.id
WHERE 
    q.paid = false 
    AND q.status = 'ACCEPTED'
GROUP BY 
    q.userId,
    u.firstName,
    u.lastName,
    u.phone,
    u.address,
    u.created_at
ORDER BY 
    order_count DESC;
    `
    );
    
    // Find the clients with the maximum 3 order count
    const topClients = result.filter((r) => r.order_count > 2) || [];

    res.json(topClients);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting big clients");
  }
};
const prospectiveClients = async (req, res) => {
  try {
    // Query to get clients who have registered but never submitted any request for quotes
    const result = await db.query(
      `
      SELECT u.id, u.firstName, u.lastName, u.phone, u.address, u.created_at
      FROM users u
      LEFT JOIN quotes q ON u.id = q.userId
      WHERE q.id IS NULL AND isAdmin=?
    `,
      [false]
    );

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting prospective clients");
  }
};
const getBadClients = async (req, res) => {
  try {
    // Query to fetch overdue bills and group by userId
    const result = await db.query(`
      SELECT 
        u.id AS userId,
        u.firstName,
        u.lastName,
        u.phone,
        u.address,
        u.created_at,
        COUNT(r.id) AS order_count,
        SUM(r.amount) AS total_amount,
        MAX(r.create_at) AS last_receipt_date
      FROM 
        receipt r
      JOIN 
        users u ON r.userId = u.id
      JOIN 
        quotes q ON r.quoteId = q.id
      WHERE 
        r.create_at < NOW() - INTERVAL 7 DAY AND r.paid = false
      GROUP BY 
        u.id, u.firstName, u.lastName, u.phone, u.address;
    `);

    // Send the result as a JSON response
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting bad clients");
  }
};

const getGoodClients = async (req, res) => {
  try {
    // Query to fetch clients who paid their bills within 24 hours of bill generation
    const result = await db.query(`
      SELECT 
        r.amount,
        u.created_at,
        r.paid_at,
        u.firstName,
        u.lastName,
        u.phone,
        u.address,
        q.area,
        COUNT(r.id) AS order_count,
        SUM(r.amount) AS total_amount,
        MAX(r.create_at) AS last_receipt_date
      FROM 
        receipt r
      JOIN 
        users u ON r.userId = u.id
      JOIN 
        quotes q ON r.quoteId = q.id
      WHERE 
        r.paid = true AND
        r.paid_at <= DATE_ADD(r.create_at, INTERVAL 1 DAY) 
        GROUP BY 
        u.id, u.firstName, u.lastName, u.phone, u.address;
    `);

    // Send the result as a JSON response
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting good clients");
  }
};

module.exports = {
  createUser,
  loginUser,
  bigClients,
  difficultClients,
  prospectiveClients,
  getBadClients,
  getGoodClients,
};
