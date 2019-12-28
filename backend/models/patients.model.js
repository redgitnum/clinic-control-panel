const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema ({
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
    personalSecurityNumber: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 8,
        trim: true,
        unique: true
    },
    birthday: {
        type: Date,
        required: true
    },
    registrationDate: {
        type: Date
    },
    blood: {
        type: String,
        required: true,
        trim: true
    },
    doctor: {
        type: String,
        required: true
    },
    visits: {}
});

module.exports = mongoose.model('Patients', patientSchema);
