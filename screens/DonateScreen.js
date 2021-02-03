import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import AppHeader from '../components/AppHeader';
import firebase from 'firebase';
import db from '../config';

export default class DonateScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      User_ID: firebase.auth().currentUser.email,
      name: '',
      age: '',
      bloodGroup: '',
      contact: '',
      address: '',
      country: '',
      email: '',
      req_ID: '',
      isRequestActive: '',
      doc_id: '',
      userDocid: '',
    }
  }

  createUniqueID() {
    return Math.random().toString(36).substring(7)
  }

  fetchData = async ()=> {
    db.collection('Users').where('Email_ID', '==', this.state.User_ID).get()
    .then((snap)=> {
      snap.forEach((doc)=> {
        this.setState({
          name: doc.data().First_Name + ' ' + doc.data().Last_Name,
          age: doc.data().Age,
          bloodGroup: doc.data().Blood_Group,
          contact: doc.data().Contact,
          address: doc.data().Address,
          country: doc.data().Country,
          email: doc.data().Email_ID,
          req_ID: doc.data().Request_ID,
          doc_id: doc.id
        })
      })
    })
  }
  
  fetchUserData = async () => {
    db.collection('Users').where('Email_ID', '==', this.state.User_ID)
    .onSnapshot((snap)=> {
      snap.forEach((doc)=> {
        this.setState({
          isRequestActive: doc.data().isRequestActive,
          userDocid: doc.id,
        })
      })
    })
  }

  addItem = async () => {
    var randReqID = this.createUniqueID();

    db.collection('Donations').add({
      Name: this.state.name,
      Age: this.state.age,
      Blood_Group: this.state.bloodGroup,
      Contact: this.state.contact,
      Address: this.state.address,
      Country: this.state.country,
      Email_ID: this.state.User_ID,
      Request_ID: randReqID,
    })

    db.collection('Users').where('Email_ID', '==', this.state.User_ID).get()
    .then((snap)=>{
      snap.forEach((doc)=> {
        db.collection('Users').doc(doc.id).update({
          isRequestActive: true
        })
      })
    })

    this.setState({
      name: '',
      age: '',
      bloodGroup: '',
      contact: '',
      address: '',
      country: '',
      email: '',
    })

    alert('You have successfully registered');
  }

  updateReqStatus = () =>{
    db.collection('Users').where('Email_ID', '==', this.state.User_ID).get()
    .then((snap)=> {
      snap.forEach((doc)=> {
        db.collection('Users').doc(doc.id).update({
          isRequestActive: false
        })
      })
    })
  }

  sendNotification = () => {
    db.collection('Users').where('Email_ID', '==', this.state.User_ID).get()
    .then((snap)=> {
      snap.forEach((doc)=> {
        var firstName = doc.data().First_Name
        var lastName = doc.data().Last_Name

        db.collection('All_Notifications').where('Request_ID', '==', this.state.req_ID).get()
        .then((snap)=> {
          snap.forEach((doc)=> {
            var reqID = doc.data().Requested_User_ID
            var name = doc.data().Name

            db.collection('All_Notifications').add({
              Donor_ID: reqID,
              Message: firstName + ' ' + lastName + ' has requested for blood donation',
              Notification_Status: 'Unread',
              Name: name
            })
          })
        })
      })
    })
  }


  componentDidMount() {
    this.fetchData();
    this.fetchUserData();
  }

  render() {
    return(
      <View>
        <TextInput
          style={styles.textInput}
          placeholder = "Full Name"
          onChangeText={(text) => {
            this.setState({
              name: text,
            });
          }}
          value = {this.state.name}
        />
        <TextInput
          style={styles.textInput}
          placeholder = "Age"
          onChangeText={(text) => {
            this.setState({
              age: text,
            });
          }}
          value = {this.state.age}
        />
        <TextInput
          style={styles.textInput}
          placeholder = "Blood Group"
          onChangeText={(text) => {
            this.setState({
              bloodGroup: text,
            });
          }}
          value = {this.state.bloodGroup}
        />
        <TextInput
          style={styles.textInput}
          placeholder = "Contact Number"
          onChangeText={(text) => {
            this.setState({
              contact: text,
            });
          }}
          value = {this.state.contact}
        />
        <TextInput
          style={styles.textInput}
          placeholder = "Email ID"
          onChangeText={(text) => {
            this.setState({
              email: text,
            });
          }}
          value = {this.state.email}
        />
        <TextInput
          style={styles.textInput}
          placeholder = "Address"
          onChangeText={(text) => {
            this.setState({
              address: text,
            });
          }}
          value = {this.state.address}
        />
        <TextInput
          style={styles.textInput}
          placeholder = "Country"
          onChangeText={(text) => {
            this.setState({
              country: text,
            });
          }}
          value = {this.state.country}
        />
        <TouchableOpacity
          style={styles.requestButton}
          onPress={()=> {
            this.addItem()
          }}
        >
          <Text style={styles.reqText}>Donate</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  textInput: {
    marginTop: 30,
    textAlign: 'center',
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 3,
  },
  requestButton: {
    backgroundColor: 'rgb(45, 210, 165)',
    marginTop: 30,
    height: 50,
    alignSelf: 'center',
    width: 150,
    borderColor: 'rgb(45, 210, 165)',
    borderRadius: 10,
  },
  reqText: {
    alignSelf: 'center',
    marginTop: 7,
    fontSize: 25,
  },
});