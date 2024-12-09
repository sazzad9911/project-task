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
    `UPDATE quotes SET address = ?, area = ?, budget = ?, image1 = ?, image2 = ?, image3 = ?, image4 = ?, image5 = ?, customerNote = ?,status=?,update_at=? WHERE id = ?`,
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
      new Date().toISOString().slice(0, 19).replace("T", " "),
      id,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
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
  //console.log(id)
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
const getUserOrders = async (req, res) => {
  const { type } = req.query;
  const user = req.user;
  try {
    const result = await db.query(
      `SELECT q.*, r.paid,r.payment_status,r.offer
FROM quotes q 
LEFT JOIN receipt r ON q.id = r.quoteId 
WHERE q.ordered = ? AND q.paid = ? AND q.userId = ? 
ORDER BY q.update_at DESC;`,
      [
        type === "dashboard" ? false : true,
        type === "payment" ? true : false,
        user.id,
      ]
    );
    res.json(result);
  } catch (error) {
    res.status(500).send("Error rejecting quote");
  }
};
const getAdminOrders = async (req, res) => {
  const { type } = req.query;
  const user = req.user;
  if (!user?.isAdmin) {
    return res.status(400).send("Admin is required");
  }
  try {
    const result = await db.query(
      "SELECT q.*, r.paid,r.payment_status,r.offer FROM quotes q LEFT JOIN receipt r ON q.id = r.quoteId AND q.userId = r.userId WHERE q.ordered = ? AND q.paid = ? ORDER BY q.update_at DESC",
      [type === "dashboard" ? false : true, type === "payment" ? true : false]
    );
    res.json(result);
  } catch (error) {
    res.status(500).send("Error rejecting quote");
  }
};
const paymentRequest = async (req, res) => {
  const { id } = req.body;
  const user = req.user;
  if (!user?.isAdmin) {
    return res.status(400).send("Admin is required");
  }
  if (!id) {
    return res.status(400).send("Fields are required!");
  }
  try {
    await db.query("UPDATE quotes SET payment_request = ? WHERE id = ?", [
      true,
      id,
    ]);
    const updateRes = await db.query(
      "SELECT offerPrice,userId FROM quotes WHERE id=?",
      [id]
    );
    // Check if the quote exists
    if (updateRes.length === 0) {
      return res.status(404).send("Quote not found");
    } // Insert a new record into the receipt table
    await db.query(
      "INSERT INTO receipt (amount, userId, quoteId) VALUES (?, ?, ?)",
      [updateRes[0].offerPrice, updateRes[0].userId, id]
    ); // Send a success response
    res.status(200).send("Payment request updated and receipt created");
  } catch (error) {
    res.status(500).send("Error payment request");
  }
};
const makePayment = async (req, res) => {
  const { id, price } = req.body;
  const user = req.user;

  if (!id || !price) {
    return res.status(400).send("Fields are required!");
  }
  try {
    await db.query("UPDATE quotes SET paid = ?,offerPrice=? WHERE id = ? AND userId=?", [
      true,
      price,
      id,
      user.id,
    ]);
    await db.query(
      "UPDATE receipt SET paid = ?,paid_at=?,payment_status=?,amount=? WHERE quoteId=?",
      [
        true,
        new Date().toISOString().slice(0, 19).replace("T", " "),
        "ACCEPTED",
        price,
        id,
      ]
    );
    
    res.json("Payment complete");
  } catch (error) {
    res.status(500).send("Error payment request");
  }
};
const calculateMonthlyRevenue = (data) => {
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const today = new Date();
  const monthlyRevenue = {};

  // Generate the last 6 months in "MONTH YYYY" format
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()]; // Get month name
    return `${month} ${year}`; // Format as "MONTH YYYY"
  }).reverse(); // Reverse to make it chronological

  // Initialize revenue for each of the last 6 months to 0
  last6Months.forEach((month) => {
    monthlyRevenue[month] = 0;
  });

  // Populate revenue from the data
  data.forEach((item) => {
    const updateDate = new Date(item.update_at);
    const year = updateDate.getFullYear();
    const month = monthNames[updateDate.getMonth()]; // Get month name
    const yearMonth = `${month} ${year}`; // Format as "MONTH YYYY"

    if (monthlyRevenue[yearMonth] !== undefined) {
      monthlyRevenue[yearMonth] += item.offerPrice;
    }
  });

  // Convert the object to an array of JSON objects
  const result = Object.entries(monthlyRevenue).map(([key, value]) => ({
    month: key,
    revenue: value,
  }));

  return result;
};

const getDashboardInfo = async (req, res) => {
  const user = req.user;
  try {
    if (user.isAdmin) {
      const result = await db.query(
        "SELECT offerPrice,update_at FROM quotes WHERE paid = ?",
        [true]
      );
      const [order] = await db.query(
        "SELECT COUNT(*) AS totalOrder FROM quotes WHERE ordered = ? AND paid = ?",
        [true, false]
      );
      const [payment] = await db.query(
        "SELECT COUNT(*) AS totalPayment FROM quotes WHERE ordered = ? AND paid = ?",
        [true, true]
      );
      const totalRevenue = result.reduce(
        (total, item) => total + item.offerPrice,
        0
      );
      const monthlyRevenue = calculateMonthlyRevenue(result);

      return res.json({
        totalOrder: order.totalOrder,
        totalPayment: payment.totalPayment,
        totalRevenue: totalRevenue,
        monthly: monthlyRevenue,
      });
    } else {
      const [order] = await db.query(
        "SELECT COUNT(*) AS totalOrder FROM quotes WHERE ordered = ? AND paid = ? AND userId=?",
        [true, false, user.id]
      );
      const [payment] = await db.query(
        "SELECT COUNT(*) AS totalPayment FROM quotes WHERE ordered = ? AND paid = ? AND userId=?",
        [true, true, user.id]
      );
      res.json({
        totalOrder: order.totalOrder,
        totalPayment: payment.totalPayment,
      });
    }
  } catch (error) {
    //console.log(error);
    res.status(500).send("Error getting");
  }
};
const getQuotesReport = async (req, res) => {
  try {
    // Query to fetch all accepted quotes
    const result = await db.query("SELECT * FROM quotes WHERE status = ?", [
      "ACCEPTED",
    ]);

    // Function to group results by month and year using update_at
    const groupByMonth = (data) => {
      return data.reduce((acc, quote) => {
        const date = new Date(quote.update_at);
        const monthYear = `${date
          .toLocaleString("default", { month: "long" })
          .toUpperCase()} ${date.getFullYear()}`;
        if (!acc[monthYear]) acc[monthYear] = [];
        acc[monthYear].push(quote);
        return acc;
      }, {});
    };

    // Group the results by month and year
    const groupedResults = groupByMonth(result);
    const keys = Object.keys(groupedResults);
    // Get the month from query parameters, or use the first key if no month is specified
    const { month } = req.query;
    // Send the grouped results as JSON
    res.json({
      keys: keys,
      data: groupedResults[month ? month : keys[0]] || [],
    });
  } catch (error) {
    res.status(500).send("Error getting quotes report");
  }
};
const getLargestDriveway = async (req, res) => {
  try {
    // Query to fetch the quotes ordered by area descending
    const result = await db.query("SELECT * FROM quotes ORDER BY area DESC");

    // Check if result is not empty
    if (result.length === 0) {
      return res.status(404).send("No quotes found");
    }

    // Find the maximum area
    const maxArea = result[0].area;

    // Filter the quotes with the maximum area
    const topArea = result.filter((r) => r.area === maxArea);

    // Send the response
    res.json(topArea);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting largest driveway quotes");
  }
};
const getOverdueBills = async (req, res) => {
  try {
    // Query to fetch overdue bills
    const result = await db.query(`
      SELECT 
        r.amount,
        r.create_at,
        u.firstName,
        u.lastName,
        u.phone,
        q.address,
        q.area
      FROM 
        receipt r
      JOIN 
        users u ON r.userId = u.id
      JOIN 
        quotes q ON r.quoteId = q.id
      WHERE 
        r.create_at < NOW() - INTERVAL 7 DAY AND r.paid=false;
    `);

    // Send the result as a JSON response
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting overdue bills");
  }
};
const cancelPaymentByUser = async (req, res) => {
  const { id, note } = req.body;
  if (!id || !note) return res.status(404).send("Not Found");
  try {
    const result = await db.query(
      "UPDATE quotes SET customerNote = ? WHERE id = ?",
      [note, id]
    );
    const repeat = await db.query(
      "UPDATE receipt SET payment_status=? WHERE quoteId=?",
      ["REJECTED", id]
    );
    res.json(repeat);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};
const updatePaymentByAdmin = async (req, res) => {
  const { id, note, discount } = req.body;
  if (!id || !note) return res.status(404).send("Not Found");
  try {
    const result = await db.query(
      "UPDATE quotes SET adminNote = ? WHERE id = ?",
      [note, id]
    );
    const repeat = await db.query(
      "UPDATE receipt SET payment_status=?,offer=? WHERE quoteId=?",
      ["PENDING", discount || 0, id]
    );
    res.json(repeat);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
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
  getAdminOrders,
  paymentRequest,
  makePayment,
  getDashboardInfo,
  getQuotesReport,
  getLargestDriveway,
  getOverdueBills,
  cancelPaymentByUser,
  updatePaymentByAdmin,
};
