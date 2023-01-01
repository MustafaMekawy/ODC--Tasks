const express = require('express');
const bookController = require('../controller/book.controller');
const router = express.Router();

router.get('/', bookController.allBooks);
router.get('/add', bookController.addBook);
router.get('/addLogic', bookController.addMyLogic);

router.get('/addPost', bookController.addPostBook);
router.post('/addPost', bookController.addMyLogic);

router.get('/single/:id', bookController.single);

router.get('/edit/:id', bookController.editBooks);
router.get('/changeStatus/:id', bookController.changeStatus);
router.post('/edit/:id', bookController.editBooksLogic);

router.get('/sort/name', bookController.sortByName);
router.get('/sort/pages', bookController.sortByPages);

router.post('/search', bookController.searchByName);

router.get('/del/:id', bookController.delBooks);

module.exports = router;
