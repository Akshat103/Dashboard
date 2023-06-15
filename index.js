require('./db/config');
const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const retrieveDocuments = require('./db/formData');

const Form = require('./model/formData');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

async function fetchData() {
  let documents;
  try {
    documents = await retrieveDocuments();
    console.log('Retrieved documents:', documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
}

fetchData();

// Set Templating Engine
app.use(expressLayouts)
app.set('view engine', 'ejs');
app.set('layout', './layouts/layout')
app.set('views', path.join(__dirname, 'views'));

// Define routes
app.get('/', (req, res) => {
  res.render('index', { layout: './layouts/layout'})
})

app.get('/form', (req, res) => {
  res.render('form', { message: req.query.message , layout: './layouts/layout'}); 
});

app.post('/form', (req, res) => {
  console.log(req.body);
  const {
    procurementSummary,
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
    procurementSummary,
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

const port = 3000;
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
