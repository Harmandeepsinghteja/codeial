const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likes_controllers');

console.log("@@@@");
router.get('/toggle',likesController.toggleLike);


module.exports = router;