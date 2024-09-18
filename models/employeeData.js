const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empDataSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Employee_data', empDataSchema);