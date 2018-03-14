const express = require('express');
const controller = require('../../controllers/room.controller');

const router = express.Router();

router.post('/create', controller.create);
router.post('/join/:id', controller.join);


module.exports = router;
