const mongoose = require('mongoose');
const schema = mongoose.Schema;
const testSchema = new schema({
    name:{
        type:String,
        required: true
    }
}, {
    timestamps: true
});

var test = mongoose.model('Test',testSchema);
module.export = { test, testSchema};
