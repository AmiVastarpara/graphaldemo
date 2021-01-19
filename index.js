// var express = require('express');
// var app = express();
// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });
// app.listen(3000, function () {
//     console.log('Example app listening on port 3000!');
// });
const {app} = require('./config/express');
const config = require('./config/config');
const debug = require('debug')('graphqltestdemo:index');
const mongoose = require('mongoose');
const Tests = require('./server/models/test.model');
const {typeDefs, resolvers } = require('./server/schema/schema');
const { ApolloServer } = require('apollo-server-express');
const url = "mongodb://localhost:27017/testapollodb";
const cors = require('cors');
const startServer = async ()=>{

    const connect = mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology:true });
    connect.then((db) =>{
        console.log('Connected correctly to server!');
    },(err)=>{
        console.log(err);
    })
    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers
    });

    server.applyMiddleware({ app });

    app.use('*', cors());

    // listen on port config.port
    app.listen(config.PORT, () => {
        console.log(`The application has started on port using ${config.PORT}`); // eslint-disable-line no-console
    });
}

startServer();
