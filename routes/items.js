const express = require('express');
const router = express.Router();
const {items} = require("../controllers/items");



// Create Item in a list
router.post('/create-item', items.addItem);


// Duplicate singular item in specific list
router.get('/items/:itemId', items.duplicateItem);

module.exports = router;