const express = require('express');
const router = express.Router();
const {lists} = require("../controllers/lists");


// Get all lists and the items
router.get('/lists', lists.allLists);

// Create List
router.post('/create-list', lists.createList);

// Singular list and its items
router.get('/lists/:listId', lists.singleList);

// Singular item in specific list
router.get('/list/:listId/items/:itemId', lists.singleListItem);

// All items in specific list
router.get('/items-in-list/:listId', lists.listItems);


// Edit a list
router.patch('/lists/editList/:listId', lists.editList);


// Edit a list
router.patch('/lists/editItems/:listId', lists.editListItems);

// Delete a specific list
router.delete('/lists/delete/:listId', lists.deleteList);

// Delete a singular item in a specific list
router.delete('/list/:listId/items/delete/:itemId', lists.deleteListItem);


// Dupicate a list and its items
router.get('/lists/duplicate/:listId', lists.duplicateList);

module.exports = router;