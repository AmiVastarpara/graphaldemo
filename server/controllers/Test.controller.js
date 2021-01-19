const mongoose = require('mongoose');
const Test = mongoose.model(`Test`);


const addTest= async (args) => {
    let test = new Test({
        name: args.name,
    });
    await test.save();
    return test;
}

module.exports={
    addTest
}
