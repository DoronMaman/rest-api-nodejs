const express = require("express");
const router = express.Router();
const user_Auth = require('../../controller/userAuth');
router.post("/signup", user_Auth.userAuth_Sign);
router.delete("/:UserAuthId", user_Auth.UserAuth_DeleteUser);
router.get('/', user_Auth.UserAuth_getAllUsers);
router.post("/login", user_Auth.UserAuth_Login);

module.exports = router;