const express = require('express');
const controller = require('../../controllers/room.controller');

const router = express.Router();

router.get('/create', controller.create);
router.get('/join/:id', controller.join);


module.exports = router;
