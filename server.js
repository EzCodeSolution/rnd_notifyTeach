const express = require('express');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
app.use(express.static(__dirname + '/dist/client'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/dist/myapp/index.html'));});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.post("/sendline",(req,res)=>{
    console.log(req.body.data)
    var token = req.body.lineToken;
    var message = req.body.data;
    request({
        method: 'POST',
        uri: 'https://notify-api.line.me/api/notify',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
          'bearer': token
        },
        form: {
          message: message
        }
      }, (err, httpResponse, body) => {
        if(err){
          console.log(err);
        } else {
          res.json({
            httpResponse: httpResponse,
            body: body
          });
        }
      });
})

app.listen(process.env.PORT || 8081);
