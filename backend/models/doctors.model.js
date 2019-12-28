const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    specialization: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }
})

module.exports = mongoose.model('Doctors', doctorSchema);
