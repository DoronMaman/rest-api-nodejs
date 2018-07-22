const express = require('express');
const router = express.Router();
const User = require('../../modal/users');
const mongoose = require('mongoose');
const checkAuth = require('../../middleware/check-auth');
const userController = require('../../controller/user')
router.get('/:id', checkAuth, userController.user_getById);
router.get('/', checkAuth, userController.user_get);
router.patch('/:userId', checkAuth, userController.user_PatchById);
router.delete('/:userId', checkAuth, userController.user_deleteUser);;
router.post('/', checkAuth, userController.user_createUser);
module.exports = router;