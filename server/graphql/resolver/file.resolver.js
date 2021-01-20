const { upload } = require('../../controllers/Test.controller');

module.exports={
    Mutation:{
        singleFileUpload: async (_, {file}) => {
            return upload(file);
        },
    }
}
