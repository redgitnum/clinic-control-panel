import React from 'react';

let Sidebar = (props) => (
    <div className="sidebar">
        <ul>
            <li><button name='addPatient' onClick={props.modalVisible}>Add New Patient</button></li>
            <li><button name='addVisit' onClick={props.modalVisible}>Add Visit</button></li>
            <li><button name='appointVisit' onClick={props.modalVisible}>Appoint Visit</button></li>
            <hr></hr>
            <li><button name='addDoctor' onClick={props.modalVisible}>Add New Doctor</button></li>
            <li><button name='changeDoctor' onClick={props.modalVisible}>Change Doctor</button></li>
            <li><button name='doctorsList' onClick={props.modalVisible}>List of Doctors</button></li>
        </ul>
    </div>
    )
    


export default Sidebar