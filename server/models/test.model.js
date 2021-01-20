const mongoose = require("mongoose");
const schema = mongoose.Schema;

const testSchema = new schema({
    name: String
},{ timestamps: true });

module.exports = mongoose.model('Test', testSchema);
