const express = require('express')
const app = express()
const mongoose = require('mongoose');
var methodOverride = require("method-override");
const Article = require('./models/article');
const port = 3030 
const articlesRouter = require('./routes/articles');


mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true
});


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride("_method"));


app.get('/', async(req, res) => {
  const articles = await Article.find().sort({
    createdAt: 'asc'
  });
  res.render('articles/index', {articles : articles});
})

app.use('/articles',articlesRouter); 

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})