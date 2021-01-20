const express = require('express');
const bodyparser = require( 'body-parser');
const routes = require( '../server/routers/index.route');
const cors = require('cors');
const app = express();

app.use(bodyparser.json());

const base_url = `/graphql`;

app.use('*', cors());

app.use(`${base_url}`,bodyparser.json(),routes);

module.exports = {app};

// export default app;
