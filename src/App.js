import React from 'react';
import './App.css';
import axios from 'axios';
import PatientList from './components/PatientList.component';
import Modals from './components/Modals.component';
import Sidebar from './components/Sidebar.component';
import TableThead from './components/TableThead.component';

class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      patients: [],
      backup: [],
      doctors: [],
      isLoading: true,
      modalVisible: false,
      option: '',
      patientInfo: '',
      changes: 0
    }


  }

  addPatient = (data) => {
    axios.post('https://clinic-platform-control.herokuapp.com/', data)
      .then((res) => {
        this.setState({patients: [...this.state.patients, data], changes: this.state.changes+1})
        console.log(res.data)
      })
  }

  addDoctor = (data) => {
    axios.post('https://clinic-platform-control.herokuapp.com/doctors', data)
      .then(res => {
        this.setState({doctors: [...this.state.doctors, data]})
        console.log(res.data)
      })
  }

  

  modalVisible = (event) => {
    this.setState({
      modalVisible: true, 
      option: event.target.name || event.target.parentNode.attributes.name.value
    })
  }

  modalHide = () => {
    this.setState({
      modalVisible: false,
    })
  }

  showPatientInfo = (e) => {
    let patientId = e.target.parentNode.id;
    axios.get('https://clinic-platform-control.herokuapp.com/patient/'+patientId)
        .then(res => this.setState({
          patientInfo: res.data,
          option: "patientInfo",
          modalVisible: true
        }))
        .then(console.log('loaded'))
    }

  filterList = (newFiltered) => {
    this.setState({
      patients: newFiltered
    })
  }

  componentDidMount() {
    axios.get("https://clinic-platform-control.herokuapp.com/")
      .then(res => {
        this.setState({
          patients: res.data,
          backup: res.data,
          isLoading: false
        })
      })
      .catch(err => console.log(err))
    axios.get("https://clinic-platform-control.herokuapp.com/doctors/")
      .then(res => {
        this.setState({doctors: res.data})
      })
      .catch(err => console.log(err))
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.changes !== this.state.changes){
      axios.get("https://clinic-platform-control.herokuapp.com/")
      .then(res => {
        this.setState({
          patients: res.data,
          backup: res.data,
          isLoading: false
        })
      })
      .catch(err => console.log(err))
      axios.get("https://clinic-platform-control.herokuapp.com/doctors/")
        .then(res => {
          this.setState({doctors: res.data})
        })
        .catch(err => console.log(err))
    }
  }

  render(){
    return(
      <div className="container">
        <Modals 
          patients={this.state.patients}
          patientInfo = {this.state.patientInfo}
          doctors={this.state.doctors}
          option={this.state.option}
          modalVisible={this.state.modalVisible}
          modalHide = {this.modalHide}
          addPatient = {this.addPatient}
          addDoctor = {this.addDoctor}
          />
        <header className="header">Clinic Control Panel</header>
        <Sidebar modalHide={this.modalHide} modalVisible={this.modalVisible} />
        
        <div className="tables">
        {this.state.isLoading ? <div style={{fontSize: '50px', textAlign: 'center', margin: '50px 0'}}>Loading...</div> :
          <table>
            <TableThead 
            backup={this.state.backup} 
            filterList={this.filterList} 
            />         
            <PatientList 
            patients= {this.state.patients} 
            doctors= {this.state.doctors}
            modalVisible = {this.modalVisible}
            showPatientInfo = {this.showPatientInfo}
            />
          </table>}
        </div>
      </div>
    )
  }

}

export default App;
