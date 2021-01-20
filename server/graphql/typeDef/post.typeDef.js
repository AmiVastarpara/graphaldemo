const { gql } = require('apollo-server-express');

module.exports = gql ` 
    extend type Query {
        hello:String!
        getAllTests: [Test!]!
        getTestByID(id: ID!): Test
    }
    extend type Mutation {
        addNewTest(name: String!): Test
        updateOldTest(id:ID!,name: String!): Test
        deleteTestById(id: ID!): String
    }
    type Test {
        id: ID!
        name: String!
        createdAt: String
        updatedAt: String
    }
`;
