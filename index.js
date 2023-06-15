require('./db/config');
const express = require('express');
const Form = require('./model/formData');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/form', (req, res) => {
  res.render('form', { message: req.query.message }); 
});

app.post('/form', (req, res) => {
  const {
    country,
    summary,
    deadline,
    noticeType,
    totalRefNo,
    documentRefNo,
    competition,
    financier,
    purchaser,
    address,
    email,
    description,
    publishDate,
  } = req.body;

  const newForm = new Form({
    country,
    summary,
    deadline,
    noticeType,
    totalRefNo,
    documentRefNo,
    competition,
    financier,
    purchaser,
    address,
    email,
    description,
    publishDate,
  });

  newForm
    .save()
    .then(() => {
      res.redirect('/form?message=Success'); 
    })
    .catch((error) => {
      console.error('Error saving tender:', error);
      res.redirect('/error');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
