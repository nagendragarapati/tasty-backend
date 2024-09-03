var express = require('express');
var cookieParser = require('cookie-parser');
const connectToDB = require('./config/db')
const cors = require('cors');

var indexRouter = require('./routes/index');

var app = express();
app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = 4000

app.listen(port, async () => {
  await connectToDB()
  console.log(`Server is started at port ${port}`)
})

module.exports = app;
