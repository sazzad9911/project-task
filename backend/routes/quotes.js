const express = require("express");
const { createQuote, updateQuote, deleteByUser, acceptByUser, rejectByUser, acceptByAdmin, rejectByAdmin, getUserOrders, getAdminOrders } = require("../controllers/quotesController");
const { basicAuth } = require("../middleware/verifyUser");

const router = express.Router();

router.post("/create",basicAuth, createQuote);
router.post("/update",basicAuth, updateQuote);
router.delete("/delete",basicAuth, deleteByUser);
router.post("/accept-user",basicAuth, acceptByUser);
router.post("/reject-user",basicAuth, rejectByUser);
router.post("/accept-admin",basicAuth, acceptByAdmin);
router.post("/reject-admin",basicAuth, rejectByAdmin);
router.get("/order-user",basicAuth, getUserOrders);
router.get("/order-admin",basicAuth, getAdminOrders);
module.exports = router;
