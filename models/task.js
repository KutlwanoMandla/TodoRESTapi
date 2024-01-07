const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true, 
    },
    complete: {
        type: Boolean,
        required: true,
        default: false
    },
    date:{
        type: String,
        required: true   
    }
});

module.exports = mongoose.model('Task', taskSchema);