const express = require ("express");
const bodyParser = require ("body-parser");
const exphbs = require ("express-handlebars");
const path = require ('path');
const nodemailer = require ("nodemailer");

const app = express();

//View engine set-up
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.render('contact');
});

app.post('/send', (req,res) => {
    console.log(req.body);
});

app.listen(3000, () => console.log('Le serveur a démarré sur le port 3000'));
