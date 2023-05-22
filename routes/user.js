const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/get-users', userController.getUsers);

router.post('/add-user', userController.postUser);

router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;