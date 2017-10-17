var cookieParser = require('cookie-parser');
var configurePassport = require('./config/passport');
let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let api = require('./api');
let routeChecker = require('./middleware/routeChecker.mw');
let clientPath = path.join(__dirname, '../client');


let app = express();
app.use(express.static(clientPath));
app.use(cookieParser());
app.use(bodyParser.json());
app.get('*', routeChecker.isAsset);
configurePassport(app);
app.use('/api', api);

app.listen(3000);









