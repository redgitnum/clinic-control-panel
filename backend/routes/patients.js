const router = require('express').Router();
let Patient = require('../models/patients.model');
let Doctor = require('../models/doctors.model');
//GETTING ALL PATIENTS DATA
router.route('/').get((req, res) => {
    Patient.find()
        .then(patients => res.json(patients))
        .catch(err => res.status(400).json('Error route get patients: ' + err))
});
//GET PATIENT DATA
router.route('/patient/:patientId').get((req, res) => {
    const patientId = req.params.patientId;
    Patient.findById(patientId)
        .then(patient => res.json(patient))
        .catch(err => console.log("Error get patient data: " + err))
});
//GETTING ALL DOCTORS DATA
router.route('/doctors').get((req, res) => {
    Doctor.find()
        .then(doctors => res.json(doctors))
        .catch(err => res.status(400).json('Error route get doctors: ' + err))
});
//GET DOCTOR DATA
router.route('/doctor/:doctorId').get((req, res) => {
    const doctorId = req.params.doctorId;
    Doctor.findById(doctorId)
        .then(doctor => res.json(doctor))
        .catch(err => console.log("Error get doctor data: " + err))
});
//ADDING NEW PATIENT
router.route('/').post((req, res) => {
    const patient = {
        name: req.body.name,
        surname: req.body.surname,
        doctor: req.body.doctor,
        birthday: req.body.birthday,
        registrationDate: new Date(Date.now()),
        personalSecurityNumber: req.body.personalSecurityNumber,
        blood: req.body.blood,
    }
    

    const newPatient = new Patient(patient);
    newPatient.save()
        .then(() => res.json('Patient added'))
        .catch(err => res.status(400).json('Error route post: ' + err));
    
});
//ADDING DOCTOR
router.route('/doctors').post((req, res) => {
    const doctor = {
        name: req.body.name,
        surname: req.body.surname,
        specialization: req.body.specialization
    }
    const newDoctor = new Doctor(doctor);
    newDoctor.save()
        .then(() => res.json('Doctor added'))
        .catch(err => res.status(400).json("Error route post doctors: " + err))
})
//ADDING VISIT TO PATIENT
router.route('/addvisit/:patientId').post((req, res) => {
    const patientId = req.params.patientId;
    const newVisit = {
        visitDate: new Date(Date.now()),
        symptoms: req.body.symptoms,
        notes: req.body.notes
    }

    Patient.findByIdAndUpdate(patientId, 
        {$push: {visits: newVisit} })
        .then(() => {
            res.json('Visit added')
        })
        .catch(err => console.log("Error addvisit: " + err))
});
//APPOINT A VISIT
router.route('/appointvisit/:patientId').post((req, res) => {
    const patientId = req.params.patientId;
    const newVisit = {
        visitDate: req.body.visitDate,
        symptoms: req.body.symptoms,
        notes: req.body.notes
    }

    Patient.findByIdAndUpdate(patientId, 
        {$push: {visits: newVisit} })
        .then(() => {
            res.json('Visit appointed')
        })
        .catch(err => console.log("Error appoinvisit: " + err))
});
//CHANGE DOCTOR
router.route('/changedoctor/:patientId').post((req, res) => {
    const patientId = req.params.patientId;
    const newDoctor = req.body.newDoctor;

    Patient.findByIdAndUpdate(patientId, 
        {doctor: newDoctor})
        .then(() => {
            res.json('Doctor changed')
        })
        .catch(err => console.log("Error appoinvisit: " + err))
});




module.exports = router;