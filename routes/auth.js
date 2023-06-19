const express = require('express');
const { body } = require('express-validator/check');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/users', authController.users);

router.get('/user/:userId', authController.getUser);

module.exports = router;