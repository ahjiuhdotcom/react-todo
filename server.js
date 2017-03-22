var express = require('express');

// Create our app
var app = express();
const PORT = process.env.PORT || 3000;

// Open Weather Map only work on 'http' not 'https'
app.use(function(req, res, next){
  if(req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

// specify the folder name that want to expose to server
app.use(express.static('public'));

app.listen(PORT, function(){
  console.log('Express server is up on port ' + PORT);
});
