const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();

app.use(express.static(path.join(__dirname, '../clientSide/public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../clientSide/views/books'));
hbs.registerPartials(path.join(__dirname, '../clientSide/layouts'));

app.use(express.urlencoded({ extended: true }));

const taskRoutes = require('./routes/tasks.routes');
const bookRoutes = require('./routes/book.routes');

app.use('/task', taskRoutes); //app.use("/task",taskRoutes)
app.use('/book', bookRoutes);

app.all('*', (req, res) =>
  res.render('err404', {
    pageTitle: 'Page Not Found',
    err: 'invalid url please try again',
  })
);

module.exports = app;
