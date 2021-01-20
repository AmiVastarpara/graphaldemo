const { gql } = require('apollo-server-express');

module.exports= gql`    
    extend type Query {
        getTests: [Test]
        getTest(id: ID!): Test
    }
    extend type Mutation {
        addTest(name: String!): Test
        updateTest(name: String!): Test
        deleteTest(id: ID!): Test
        singleUpload(file: Upload ): String!
    }
    type Test {
        id: ID!
        name: String!
    }
`;
