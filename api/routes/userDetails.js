const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');
const userDetails = require('../../controller/userDeatails');
router.post('/', checkAuth, userDetails.userDetails_createDetails);
router.get('/', checkAuth, userDetails.userDetails_getAllUsers);
module.exports = router;