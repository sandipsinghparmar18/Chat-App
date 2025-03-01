const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");
const wrapAsync = require("../middlewares/wrapAsync");
const { authorization } = require("../middlewares/authorization");
const {upload} = require("../middlewares/multer.js");

router.get("/profile", authorization, wrapAsync(userControllers.getAuthUser));
router.get("/users", authorization, wrapAsync(userControllers.getAllUsers));
router.post("/update-profile",authorization,upload.single("profile"),wrapAsync(userControllers.uploadUserProfile));

module.exports = router;
