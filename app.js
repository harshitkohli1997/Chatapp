const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const app = express();

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
  }));
  app.set('view engine', 'handlebars');

  app.get('/' , (req,res) => {
    res.render('layouts/main');
  })

  // Static folder
app.use(express.static(path.join(__dirname, 'public')));

//setting server

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started on port ${port}`)
})