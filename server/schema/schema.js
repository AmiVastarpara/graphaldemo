const { gql } = require('apollo-server-express');
const { addTest, upload } = require('../controllers/Test.controller');
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
            return upload(file);
        },
    },
}

module.exports = {
    resolvers,
    typeDefs
}


