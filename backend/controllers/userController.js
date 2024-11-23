const db = require("../db/connection");

const getUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(500).send("Error fetching users");
    } else {
      res.json(results);
    }
  });
};

module.exports = { getUsers };
