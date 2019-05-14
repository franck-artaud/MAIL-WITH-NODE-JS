const express = require ("express");
const bodyParser = require ("body-parser");
const exphbs = require ("express-handlebars");
const path = require ('path');
const nodemailer = require("nodemailer");

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

app.post('/send', async (req, res) => {
    const output = `
    <p><strong>Vous avez recu un message via votre formulaire</strong></p>
    <h3>Les détails du message</h3>
    <ul>
    <li>Nom: ${req.body.nom}</li>
    <li>Entreprise: ${req.body.entreprise}</li>
    <li>Email: ${req.body.emaill}</li>
    <li>Telephone: ${req.body.telephone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ionos.fr",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'franck-artaud@atelier601.com', // generated ethereal user
      pass: 'Alaska@602603' // generated ethereal password
    },
    tls :{
       rejectUnauthorrized:false 
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'franck-artaud@atelier601.com', // sender address
    to: "curzon601602603@gmail.com", // list of receivers
    subject: "Node Contact Request ", // Subject line
    text: "Hello world?", // plain text body
    html: output// html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.render('contact', {msg: 'Votre message a été envoyé'});

    
});




app.listen(process.env.PORT || 3000, () => console.log('Le serveur a démarré sur le port 3000'));
