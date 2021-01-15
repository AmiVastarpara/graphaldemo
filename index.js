// var express = require('express');
// var app = express();
// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });
// app.listen(3000, function () {
//     console.log('Example app listening on port 3000!');
// });
const {app} = require('./config/express');
const debug = require('debug')('permit-app-api:index');
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// listen on port config.port
app.listen('4000', () => {
    console.log(`The application has started on port 4000`); // eslint-disable-line no-console
});
