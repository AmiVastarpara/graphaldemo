const {app} = require('../config/express');
const config = require('../config/config');
const debug = require('debug')('graphqltestdemo:index');
const mongoose = require('mongoose');
const AppModels = require('./models');
const {typeDefs, resolvers } = require('./graphql');
const { ApolloServer } = require('apollo-server-express');
const url = "mongodb://localhost:27017/testapollodb";
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});
const startServer = async ()=>{
    try{
        await mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology:true }).then(()=>{
            console.log("Connection correctly to server!");
        });

        server.applyMiddleware({ app });

        // listen on port config.port
        app.listen(config.PORT, () => {
            console.log(`The application has started on port using ${config.PORT}`); // eslint-disable-line no-console
        });
    }catch (e) {
        console.log("ERROR:",e.message)
    }

}

startServer();
