const dealHelper = require('../helper/dealWithJson.helper');
const dataHelper = require('../helper/data.helper');

class Book {
  /*start get add*/
  static addBook = (req, res) => {
    res.render('addBook', { pageTitle: 'Add Book' });
  };
  static addBookGetLogic = (req, res) => {
    const book = { id: Date.now(), status: false, ...req.query };
    const all = dealHelper.readFromJSON('booksInfo');
    all.push(book);
    dealHelper.writeToJSON('booksInfo', all);
    res.redirect('/book');
  };
  /*end get add */
  /*start post add*/
  static addPostBook = (req, res) => {
    res.render('addBookPost', { pageTitle: 'Add Book' });
  };
  static addBookPostLogic = (req, res) => {
    console.log(req.method);
    const book = { id: Date.now(), status: false, ...req.body };
    const all = dealHelper.readFromJSON('booksInfo');
    all.push(book);
    dealHelper.writeToJSON('booksInfo', all);
    res.redirect('/book');
  };
  /*end post add */
  /*add logic for both get and post*/
  static addMyLogic = (req, res) => {
    console.log(req.url);
    console.log(req.query);
    console.log(req.body);
    let book;
    if (req.method == 'POST')
      book = { id: Date.now(), status: false, ...req.body };
    else book = { id: Date.now(), status: false, ...req.query };
    const all = dealHelper.readFromJSON('booksInfo');
    all.push(book);
    dealHelper.writeToJSON('booksInfo', all);
    res.redirect('/book');
  };
  /*end logic for both get and post*/

  // static allBooks = (req, res) => {
  //   console.log('ss');
  //   // const books = dealHelper.readFromJSON('booksInfo');
  //   res.render('allBooks', {
  //     pageTitle: 'All Tasks',
  //     books,
  //     hasBooks: books.length,
  //   });
  // };

  static allBooks = (req, res, next, data = []) => {
    let books;
    if (data.length === 0) books = dealHelper.readFromJSON('booksInfo');
    else books = data;

    res.render('allBooks', {
      pageTitle: 'All Tasks',
      books,
      hasBooks: books.length,
    });
  };

  static single = (req, res) => {
    // const id = req.params.id
    const all = dealHelper.readFromJSON('booksInfo');
    // const result = all.find(task=> task.id == id )
    // const result = (dealHelper.readFromJSON()).find(task=> task.id == req.params.id)
    const result = dataHelper.getId(all, 'id', req.params.id);
    res.render('single', {
      pageTitle: 'single page',
      result: all[result],
    });
  };

  static editBooks = (req, res) => {
    const all = dealHelper.readFromJSON('booksInfo');
    const result = dataHelper.getId(all, 'id', req.params.id);
    res.render('edit', {
      pageTitle: 'edit page',
      result: all[result],
    });
  };

  static editBooksLogic = (req, res) => {
    const all = dealHelper.readFromJSON('booksInfo');
    const result = dataHelper.getId(all, 'id', req.params.id);
    if (result == -1)
      return res.render('err404', { pageTitle: 'invalid', err: 'invalid id' });

    const newTask = { id: req.params.id, ...req.body };

    newTask.status == 'on' ? (newTask.status = true) : (newTask.status = false);
    all[result] = newTask;
    dealHelper.writeToJSON('booksInfo', all);
    res.redirect(`/book/single/${req.params.id}`);
  };

  static delBooks = (req, res) => {
    const all = dealHelper.readFromJSON('booksInfo');
    // const data = all.filter(task=> task.id!=req.params.id)
    const taskIndex = dataHelper.getId(all, 'id', req.params.id);
    if (taskIndex != -1) all.splice(taskIndex, 1);
    dealHelper.writeToJSON('booksInfo', all);
    res.redirect('/book');
  };

  static changeStatus = (req, res) => {
    const all = dealHelper.readFromJSON('booksInfo');
    // const taskIndex = all.findIndex(task=> task.id==req.params.id)
    const taskIndex = dataHelper.getId(all, 'id', req.params.id);
    if (taskIndex == -1)
      return res.render('err404', {
        pageTitle: 'invalid',
        err: 'invalid task id',
      });
    all[taskIndex].status = !all[taskIndex].status;
    dealHelper.writeToJSON('booksInfo', all);
    res.redirect('/book');
  };

  static sortByName = (req, res, next) => {
    const all = dealHelper.readFromJSON('booksInfo');
    all.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    this.allBooks(req, res, next, all);
  };
  static sortByPages = (req, res, next) => {
    const all = dealHelper.readFromJSON('booksInfo');
    all.sort((a, b) => {
      return a.pages - b.pages;
    });
    this.allBooks(req, res, next, all);
  };

  static searchByName = (req, res, next) => {
    const all = dealHelper.readFromJSON('booksInfo');
    let searchedData = all.filter(d => {
      return d.name.toUpperCase().includes(req.body.search.toUpperCase());
    });
    if (searchedData.length === 0) searchedData = -1;
    this.allBooks(req, res, next, searchedData);
  };
}

module.exports = Book;
