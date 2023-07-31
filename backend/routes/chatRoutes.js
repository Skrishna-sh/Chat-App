const express = require("express");
const protect = require("../middleWare/authMiddleware");
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require("../controllers/chatControllers");
const router = express.Router();

router.route("/").post(protect, accessChat);
// router.route("/").post((req, res) => {
//     console.log("working fine")
// });
// router.post("/", (req,res)=> {
//     console.log("heelo")
//     res.send("hello bhai")
// })
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;