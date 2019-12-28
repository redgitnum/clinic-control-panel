import React from 'react';
import axios from 'axios';


class Modals extends React.Component{

    render(){

      window.onclick = (event) => {
        let modalBox = document.getElementById('modal')
        if(event.target === modalBox) {
          defaultForm()
          this.props.modalHide()
        }
      }

      let defaultForm = () => {
        let forms = document.getElementsByTagName('form');
        for(let i = 0; i < forms.length; i++) {
          forms[i].reset()
        }
      }

      let sendData = (e) => {
        e.preventDefault()
        let patient = {
          name: document.getElementById('name').value.trim(),
          surname: document.getElementById('surname').value.trim(),
          doctor: document.getElementById('doctor').value,
          birthday: document.getElementById('birthday').value,
          registrationDate: new Date(Date.now()).toJSON(),
          personalSecurityNumber: document.getElementById('personalSecurity').value.trim(),
          blood: document.getElementById('blood').value
        }
          this.props.addPatient(patient)
          this.props.modalHide()
          defaultForm()
      }

      let addVisit = (e) => {
        e.preventDefault()
        let patientId =  document.getElementById('patient').value;
        let visit = {
          symptoms: document.getElementById('symptoms').value,
          notes: 'Doctor notes: '.concat(document.getElementById('notes').value)
        }

        axios.post('https://clinic-platform-control.herokuapp.com/addvisit/'+ patientId, visit)
          .then(res => console.log(res.data))
        this.props.modalHide();
        defaultForm();
      }

      let appointVisit = (e) => {
        e.preventDefault();
        let patientId =  document.getElementById('patientAppoint').value;
        
        let visit = {
          visitDate: document.getElementById('visit').value,
          symptoms: document.getElementById('symptomsAppoint').value,
          notes: 'Patient notes: '.concat(document.getElementById('notesAppoint').value)
        }
        console.log(visit.visitDate)
        axios.post('https://clinic-platform-control.herokuapp.com/appointVisit/'+ patientId, visit)
          .then(res => console.log(res.data))
        this.props.modalHide();
        defaultForm();
      }

      let addDoctor = (e) => {
        e.preventDefault();
        let doctor = {
          name: document.getElementById('docName').value,
          surname: document.getElementById('docSurname').value,
          specialization: document.getElementById('docSpec').value
        }
        this.props.addDoctor(doctor);
        this.props.modalHide();
        defaultForm();
      }

       let changeDoctor = (e) => {
        e.preventDefault();
        let patientId =  document.getElementById('patientChange').value;
        let docNode = document.getElementById(patientId).lastChild;

        docNode.innerText = document.getElementById('newDoctor').value;
        let doctor = {
          newDoctor: document.getElementById('newDoctor').value
        }
        
        axios.post('https://clinic-platform-control.herokuapp.com/changedoctor/' + patientId, doctor)
          .then(res => console.log(res.data))
        this.props.modalHide();
        defaultForm();
      }

        return(
            <div 
            style={{display: this.props.modalVisible ? 'block' : 'none'}} 
            className="modal"
            id="modal"
            >
              <div className="modal-box">
                <div style={{display: this.props.option === 'addPatient' ? 'flex': 'none'}} className="modal-body">
                  <i onClick={() => {
                    this.props.modalHide();
                    defaultForm();
                  }}>X</i>
                  <h2>Add Patient</h2>
                  <form onSubmit={sendData}>
                    <label>Name: <input id='name' type="text" placeholder="Name..." required></input></label>
                    <label>Surname: <input id='surname' type="text" placeholder="Surname..." required></input></label>
                    <label>Date of Birth: <input id='birthday' type="date" required></input></label>
                    <label>Personal Security Number: <input id='personalSecurity' type="number" placeholder="(8 numbers)" required></input></label>
                    <label>Bloodtype: 
                      <select id='blood'>
                        <option value='A-'>A-</option>
                        <option value='A+'>A+</option>
                        <option value='B-'>B-</option>
                        <option value='B+'>B+</option>
                        <option value='O-'>O-</option>
                        <option value='O+'>O+</option>
                        <option value='AB-'>AB-</option>
                        <option value='AB+'>AB+</option>
                      </select>
                    </label>
                    <label>Doctor: 
                      <select id='doctor'>
                        {this.props.doctors.map((doctor, i) => 
                          <option key={i} value={doctor.surname}>{doctor.surname}</option>
                        )}
                      </select>
                    </label>
                    <hr></hr>
                    <button type="submit">Submit</button>
                  </form>
                </div>
                <div style={{display: this.props.option === 'addVisit' ? 'flex': 'none'}} className="modal-body">
                  <i onClick={() => {
                    this.props.modalHide();
                    defaultForm();
                  }}>X</i>
                  <h2>Add Visit</h2>
                  <form onSubmit={addVisit}>
                    <label>Patient: 
                      <select id="patient">
                        {[...this.props.patients].sort((a, b) => a.name > b.name).map((patient, i) => (
                            <option key={i} value={patient._id}>{patient.name} {patient.surname}</option>
                            )
                        )}
                      </select>
                    </label>
                    <label>Symptoms: <input id="symptoms" type="text" required></input></label>
                    <textarea id="notes" placeholder="extra notes..."></textarea><hr></hr>
                  <button type="submit">Submit</button>
                  </form>
                </div>
                <div style={{display: this.props.option === 'appointVisit' ? 'flex': 'none'}} className="modal-body">
                  <i onClick={() => {
                    this.props.modalHide();
                    defaultForm();
                  }}>X</i>
                  <h2>Appoint Visit</h2>
                  <form onSubmit={appointVisit}>
                    <label>Patient: 
                      <select id="patientAppoint">
                        {[...this.props.patients].sort((a, b) => a.name > b.name).map((patient, i) => (
                            <option key={i} value={patient._id}>{patient.name} {patient.surname}</option>
                            )
                        )}
                      </select>
                    </label>
                    <label>Date of visit: <input id="visit" type="date" required></input></label>
                    <label>Symptoms: <input id="symptomsAppoint" type="text" required></input></label>
                    <textarea id="notesAppoint" placeholder="extra notes..."></textarea><hr></hr>
                  <button type="submit">Submit</button>
                  </form>
                </div>
                <div style={{display: this.props.option === 'addDoctor' ? 'flex': 'none'}} className="modal-body">
                  <i onClick={() => {
                    this.props.modalHide();
                    defaultForm();
                  }}>X</i>
                  <h2>Add New Doctor</h2>
                  <form onSubmit={addDoctor}>
                    <label>Name: <input id="docName" type="text" required></input></label>
                    <label>Surname: <input id="docSurname" type="text" required></input></label>
                    <label>Specialization: <input id="docSpec" type="text" required></input></label><hr></hr>
                    <button type="submit">Submit</button>
                  </form>
                </div>
                <div style={{display: this.props.option === 'changeDoctor' ? 'flex': 'none'}} className="modal-body">
                  <i onClick={() => {
                    this.props.modalHide();
                    defaultForm();
                  }}>X</i>
                  <h2>Change Doctor</h2>
                  <form onSubmit={changeDoctor}>
                    <label>Patient: 
                      <select id="patientChange">
                        {[...this.props.patients].sort((a, b) => a.name > b.name).map((patient, i) => (
                            <option key={i} value={patient._id}>{patient.name} {patient.surname}</option>
                            )
                        )}
                      </select>
                    </label>
                    <label>Doctor: 
                      <select id="newDoctor">
                        {this.props.doctors.map((doctor, i) => 
                          <option key={i} value={doctor.surname}>{doctor.surname}</option>
                        )}
                      </select>
                    </label><hr></hr>
                  <button type="submit">Submit</button>
                  </form>
                </div>
                <div style={{display: this.props.option === 'doctorsList' ? 'flex': 'none'}} className="modal-body">
                  <i onClick={() => {
                    this.props.modalHide();
                    defaultForm();
                  }}>X</i>
                <h2>List of Doctors</h2>
                  <div className="tables">
                    <table>
                      <tbody>
                        <tr>
                          <th>Name</th>
                          <th>Surname</th>
                          <th>Specialization</th>
                        </tr>
                        {this.props.doctors.map((doctor, i) => 
                          <tr key={i}>
                            <td>{doctor.name}</td>
                            <td>{doctor.surname}</td>
                            <td>{doctor.specialization[0].toUpperCase() + doctor.specialization.slice(1)}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div style={{display: this.props.option === 'patientInfo' ? 'flex': 'none'}} className="modal-body">
                  <i onClick={() => {
                    this.props.modalHide();
                    defaultForm();
                  }}>X</i>
                  <h2>Patient Data</h2>
                  <ul id="visitListStyle"style={{margin: '10px', width: "100%"}}>
                    <li>Name: {this.props.patientInfo.name}</li>
                    <li>Surname: {this.props.patientInfo.surname}</li>
                    <li>Date of birth: {String(this.props.patientInfo.birthday).substring(0,10)}</li>
                    <li>Security Number: {this.props.patientInfo.personalSecurityNumber}</li>
                    <li>Registration Date: {String(this.props.patientInfo.registrationDate).substring(0,10)}</li>
                    <li>Blood: {this.props.patientInfo.blood}</li>
                    <li>Doctor: {this.props.patientInfo.doctor}</li>
                  </ul>
                  <div className="tables">
                    <table style={{fontSize: '14px'}}>
                      <tbody>
                        <tr>
                          <th>Date of visit</th>
                          <th>Symptoms</th>
                          <th>Notes</th>
                        </tr>
                        {this.props.patientInfo.visits ? this.props.patientInfo.visits.map((visit  ,i) => 
                        <tr key={i}>
                          <td>{visit.visitDate.substring(0, 10)}</td>
                          <td>{visit.symptoms}</td>
                          <td>{visit.notes}</td>
                          
                        </tr>) : <tr><td>no visits yet</td></tr>}
                          
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}
export default Modals;