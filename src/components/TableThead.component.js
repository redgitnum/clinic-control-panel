import React from 'react';

class TableThead extends React.Component {

  filter = () => {
    let name = document.getElementById('searchName').value;
    let surname = document.getElementById('searchSurname').value
    let birthday = document.getElementById('searchBirthday').value
    let registrationDate = document.getElementById('searchRegistrationDate').value
    let personalSecurityNumber = document.getElementById('searchPersonalSecurityNumber').value
    let blood = document.getElementById('searchBlood').value
    let doctor = document.getElementById('searchDoctor').value
  
    let newFiltered = [...this.props.backup].filter(patient => {
      return(
        patient.name.toLowerCase().includes(name.toLowerCase()) &&
        patient.surname.toLowerCase().includes(surname.toLowerCase()) &&
        patient.birthday.substring(0,10).includes(birthday.toLowerCase()) &&
        patient.registrationDate.substring(0,10).includes(registrationDate.toLowerCase()) &&
        patient.personalSecurityNumber.toLowerCase().includes(personalSecurityNumber.toLowerCase()) &&
        patient.blood.toLowerCase().includes(blood.toLowerCase()) &&
        patient.doctor.toLowerCase().includes(doctor.toLowerCase())
      )
      
    })
    this.props.filterList(newFiltered)
  
  }

  render() {
    return(
      <tbody>
        <tr>
          <th>Filter</th>
          <th><input onChange={this.filter} className="searchBox" id="searchName" placeholder="by name..." type="text"></input></th>
          <th><input onChange={this.filter} className="searchBox" id="searchSurname" placeholder="by surname..." type="text"></input></th>
          <th><input onChange={this.filter} className="searchBox" id="searchBirthday" placeholder="by date of birth..." type="text"></input></th>
          <th><input onChange={this.filter} className="searchBox" id="searchPersonalSecurityNumber" placeholder="by security number..." type="text"></input></th>
          <th><input onChange={this.filter} className="searchBox" id="searchRegistrationDate" placeholder="by registration date..." type="text"></input></th>
          <th><input onChange={this.filter} className="searchBox" id="searchBlood" placeholder="by bloodtype..." type="text"></input></th>
          <th><input onChange={this.filter} className="searchBox" id="searchDoctor" placeholder="by doctor..." type="text"></input></th>
        </tr>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Date of Birth</th>
          <th>Security Number</th>
          <th>Registration Date</th>
          <th>Bloodtype</th>
          <th>Doctor</th>
        </tr>
    </tbody>
    )
  }
}

export default TableThead