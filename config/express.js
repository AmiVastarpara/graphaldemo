const express = require('express');
const bodyparser = require( 'body-parser');
const routes = require( '../server/routers/index.route');

const app = express();

app.use(bodyparser.json());

const base_url = `/graphql-api`;

app.use(`${base_url}`,routes);

module.exports = {app};

// export default app;
