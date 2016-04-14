var express = require('express');
var app = express();

var myMiddleware = express.static('./public');
app.use(myMiddleware);

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Listening on port ' + port);
});
