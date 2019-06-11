var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');
    
    var app = express();

    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
    app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); 
    app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); 
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    

   
    
    var port = 3000;
    app.get('/index.ejs', function (req, res) {
      res.render('index');
    });
    
    

    app.post('/send-email', function (req, res) {
        
      let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'maggieebart@gmail.com',
              pass: '******'
          }
          
      });
      let mailOptions = {
          from: '"site-Artec" <maggieebart@gmail.com>', // sender address
          to: 'miriafassarella@gmail.com', // list of receivers
          subject: "Pedido de Orçamento!",
            html: "<strong>Nome: </strong>" + req.body.name + "<br><strong>Email: </strong>" + req.body.email
            + "<br><strong>Mensagem: </strong>" + req.body.message
             };
             
             

             transporter.sendMail(mailOptions, (error, info) => {
                 
                 
                if (error) {
                    return console.log(error);
                    
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                    res.redirect('success.html');
                    
                    
                });
            });
                app.listen(port, function(){
                  console.log('Server is running at port: ',port);
                });