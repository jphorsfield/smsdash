var express = require('express');
var router = express.Router();

require('dotenv').config();
    const Pusher = require('pusher');
    const pusher = new Pusher({
        appId: process.env.PUSHER_APP_ID,
        key: process.env.PUSHER_APP_KEY,
        secret: process.env.PUSHER_APP_SECRET,
        cluster: process.env.PUSHER_APP_CLUSTER
    });

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile(__dirname + '/index.html');
});

router.post('/status', function(req, res, next){
  console.log('This is the message: '+JSON.stringify(req.body));
  try {
    if(req.body.MessageStatus === 'delivered' || req.body.MessageStatus === 'undelivered'){
      let dateObj = formatDate();
      console.log('This is a delivery event');
      let increment = 1;
      let data = {};
      data.sid = req.body.MessageSid;
      data.direction = "Outbound";
      data.from = req.body.From;
      data.to = req.body.To;
      data.date = dateObj;
      data.status = req.body.MessageStatus;
      console.log('Sending data: '+data);
      pusher.trigger('message', 'add', {data});
      pusher.trigger('order', 'place', {increment});
      //callback(null, null);
      res.status(200).send('Success');
    }
  }
  catch(err){
    console.log('This is the error with the status callback: '+err);
  }
  
})

function formatDate() {
  var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('-');
}

module.exports = router;
