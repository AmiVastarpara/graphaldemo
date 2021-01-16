const { gql } = require('apollo-server-express');
const test = require('../models/test.model').test;

const typeDefs = gql`
    type test {
        id: ID!
        name: String!
    }
    type Query {
        getTests: [test]
        getTest(id: ID!): test
    }
    type Mutation {
        addTest(name: String!): test
        updateTest(name: String!): test
        deleteTest(id: ID!): test
    }
`;

const resolvers = {
    Query: {
        getTests: (parent, args) => {
            return test.find({});
        },
        getTest: (parent, args) => {
            return test.findById(args.id);
        }
    },
    Mutation: {
        addTest: (parent, args) => {
            let test = new test({
                name: args.name,
            });
            return test.save();
        },
        updateTest: (parent, args) => {
            if (!args.id) return;
            return test.findOneAndUpdate(
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
        }
    }
}

module.exports = {
    resolvers,
    typeDefs
}


