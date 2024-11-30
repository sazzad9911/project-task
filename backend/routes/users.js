const express = require("express");
const { createUser, loginUser, bigClients, difficultClients, prospectiveClients, getGoodClients, getBadClients } = require("../controllers/userController");
const { basicAuth } = require("../middleware/verifyUser");

const router = express.Router();

router.post("/create", createUser);
router.post('/login',loginUser)
router.get("/big-clients",basicAuth,bigClients)
router.get("/difficult-clients",basicAuth,difficultClients)
router.get("/prospective-clients",basicAuth,prospectiveClients)
router.get("/good-clients",basicAuth,getGoodClients)
router.get("/bad-clients",basicAuth,getBadClients)
module.exports = router;
