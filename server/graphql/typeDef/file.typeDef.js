const { gql } = require('apollo-server-express');

module.exports=gql `
    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }
    extend type Query {
        uploadFile:[File]
        info : String!
    }
    extend type Mutation {
        singleFileUpload(file: Upload ): String!
    }
`;
