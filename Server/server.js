var app = require('koa')();
var http = require('http');
var router = require('koa-router')();
var bodyParser = require('koa-body')();
var serve = require('koa-static');
var nodemailer = require('nodemailer');

app.use(serve('../Client')); //serve public files
router.post("/sendEmail",bodyParser, function *(next){
    //get form data from client
    var data = this.request.body;
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'tindid3@gmail.com',
            pass: 'tindid3password'
        }
    });
    var mesaj =
        '<p>Nume si prenume: ' + data.nume +
        '</p><p>Email: ' + data.email +
        '</p><p>Titlul academic / ştiinţific: ' + data.titlu_academic +
        '</p><p>Instituţia (şi ţara de provenienţă): ' + data.institutie+
        '</p><p>Secţiunea: ' + data.sectiune +
        '</p><p>Titlul lucrării: ' + data.titlu_lucrare +
        '</p><p>Cuvinte-cheie: ' + data.cuv_cheie+
        '</p><p>Rezumat: ' + data.rezumat +
        '</p>';
// setup email data with unicode symbols
    var mailOptions = {
        from: 'TINDID3 <tindid3@gmail.com>', // sender address
        to: 'ciureapaul@gmail.com', // list of receivers
        subject: "Lucrare: " + data.titlu_lucrare, // Subject line
        html: mesaj
    };
// send mail with defined transport object
    transporter.sendMail(mailOptions, function(err){
        if(err) console.log(err);
        else console.log("Email trimis. Nume lucrare:" + data.titlu_lucrare )
    });
    yield(next);

});
app.use(router.routes()); //use routes
app.use(function *(){
    //redirect 404
    this.redirect('/index.html');
});
console.log("Running on 8080");
app.listen(process.env.PORT || 8080 );