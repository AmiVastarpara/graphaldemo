const { gql, GraphQLUpload } = require('apollo-server-express');
const { addTest } = require('../controllers/Test.controller');
const mongoose = require('mongoose');
const Test = mongoose.model(`Test`);
const { join, parse } = require('path');
const  {createWriteStream } = require('fs');


const typeDefs = gql`

    type Test {
        id: ID!
        name: String!
    }
    type Query {
        getTests: [Test]
        getTest(id: ID!): Test
        uploads:[File]
    }
    type Mutation {
        addTest(name: String!): Test
        updateTest(name: String!): Test
        deleteTest(id: ID!): Test
        singleUpload(file: Upload ): String!
    }
    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }
`;

const resolvers = {
    Query: {
        getTests: (parent, args) => {
            return Test.find({});
        },
        getTest: (parent, args) => {
            return Test.findById(args.id);
        },
        uploads: (parent, args) => {},
    },
    Mutation: {
        addTest: async (parent, args) => {
            return addTest(args);
        },
        updateTest: (parent, args) => {
            if (!args.id) return;
            return Test.findOneAndUpdate(
                {
                    _id: args.id
                },
                {
                    $set: {
                        name: args.name,
                    }
                }, {new: true}, (err, test) => {
                    if (err) {
                        console.log('Something went wrong when updating the test');
                    } else {
                    }
                }
            );
        },
        singleUpload: async (_, {file}) => {
            const {createReadStream, filename, mimetype} = await file;
            const stream = createReadStream();
            // const file = storeUpload({stream, filename, mimetype});
            let {
                ext,name
            }=parse(filename);
            name = name.replace(/([^a-z0-9 ]+)/gi,'-').replace(' ','_');

            let serverFile = join(__dirname,`../../public/images/${name}-${Date.now()}${ext}`);

            let writeStream = await createWriteStream(serverFile);
            await stream.pipe(writeStream);

            serverFile = `http://localhost:4000/${serverFile.split('images')[1]}`;

            return serverFile;

            return file;
        },
    },
}

module.exports = {
    resolvers,
    typeDefs
}


