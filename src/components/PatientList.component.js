import React from 'react';

let PatientList = (props) => (
    <tbody>
        {props.patients.map((patient, i) => 
            <tr key={i} onClick={props.showPatientInfo} id={patient._id}>
                <td>{i+1}</td>
                <td>{patient.name}</td>
                <td>{patient.surname}</td>
                <td>{patient.birthday.substring(0,10)}</td>
                <td>{patient.personalSecurityNumber}</td>
                <td>{patient.registrationDate.substring(0,10)}</td>
                <td>{patient.blood}</td>
                <td id='doctorNode'>{patient.doctor}</td>
            </tr>
        )}
    </tbody>
)

export default PatientList;