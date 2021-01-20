const mongoose = require('mongoose');
const Test = mongoose.model(`Test`);
const { addTest } = require('../../controllers/Test.controller');


module.exports = {
    Query:{
        hello:()=>'hello world',
        getAllTests:(parent, args) => {
            return Test.find({});
        },
        getTestByID: (parent, args) => {
            return Test.findById(args.id);
        },
    },
    Mutation:{
        addNewTest:(parent, args)=>{
            return addTest(args);
        },
        updateOldTest: (parent, args) => {
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
        deleteTestById:async (parent, args) => {
            if (!args.id) return;
            await Test.findByIdAndDelete(args.id);
            return "Your record has benn deleted";
        }
    }
}
