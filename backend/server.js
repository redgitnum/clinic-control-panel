const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

port = process.env.PORT || 5000;
uri = process.env.MONGO_URI;

app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(uri, {useFindAndModify:false ,useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true});
mongoose.connection.once('open', () => {
    console.log('MongoDB connection established');
})

const patientsRouter = require('./routes/patients');
app.use('/', patientsRouter);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})