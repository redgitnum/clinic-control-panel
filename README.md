## CLINIC CONTROL PANEL

### intro

Similar to the last project, just with more depth. Not used bootstrap with this one for more practice with css. App to be used by a clinic personnel to appoint visit(via phonecall) or by a doctor to add visit(walk-in patient without appointment). Kept adding functionality as I worked on the project so some things may look messy. More info below.

### overview

The plan was to make the project similar to last one but more detailed and with a better file structure. It is better than the last one but because I kept adding stuff after making the 'base' app it went a little bit sideways. Everything is working as intended just the code is not as clean as I wanted it to be.

* START
  * At the start the app loads data from database(MongoDB) and shows the list of patients after loading,
  * doctors list load at the same time, just another axios fetch

* ADD PATIENT
  * Add a patient with basic information,
  * choose your doctor from the ones available,
  * all fields required
  
* ADD VISIT
  * Add visit as a doctor when a patient just walks in the clinic without appointment,
  * doctor can add extra notes about the visit or patient

* APPOINT VISIT
  * Used when patient calls the clinic to appoint the visit,
  * filled by a clinic personnel,
  * symptoms and extra notes are filled according to what the patient says
  
* ADD DOCTOR
  * self explanatory
  
* CHANGE DOCTOR
  * Used to change patient's main doctor to another,
  * both lists get info from the list of patients/doctors,
  
* LIST OF DOCTORS
  * self explanatory

* PATIENT DETAILS
  * You can click on a patient record to see the history of his/her visits,
  * appointed visits have additional text 'Patient notes:' in the beginning of notes cell,
  * visits without appointment have additional text 'Doctor notes:' in the beginning of notes cell

* FILTERING
  * You can filter the list of patients with any of the available data,
  * multiple fields can work at the same time
