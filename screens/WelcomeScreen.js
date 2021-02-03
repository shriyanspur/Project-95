import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import db from '../config';
import firebase from 'firebase';


export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      bloodGroup: '',
      contact: '',
      address: '',
      country: '',
      email: '',
      password: '',
      confirmPass: '',
      isModalVisible: false,
    }
  }


  showModal = ()=>{
    return (
      <Modal visible = {this.state.isModalVisible}>
        <View>
          <ScrollView style = {styles.backgroundModal}>
            <KeyboardAvoidingView>
              <Text style={styles.modalHeaderText}>
                Registration
              </Text>
              <TextInput
                placeholder="First Name"
                style={styles.textInput1}
                onChangeText={(text)=>{
                  this.setState({
                    firstName: text
                  })
                }}
              />
              <TextInput
                placeholder="Last Name"
                style={styles.textInput2}
                onChangeText={(text)=>{
                  this.setState({
                    lastName: text
                  })
                }}
              />
              <TextInput
                placeholder="Age"
                style={styles.textInput2}
                keyboardType='numeric'
                maxLength={3}
                onChangeText={(text)=>{
                  this.setState({
                    age: text
                  })
                }}
              />
              <TextInput
                placeholder="Blood Group"
                style={styles.textInput2}
                onChangeText={(text)=>{
                  this.setState({
                    bloodGroup: text
                  })
                }}
              />
              <TextInput
                placeholder="Contact Number"
                style={styles.textInput2}
                keyboardType='numeric'
                maxLength={10}
                onChangeText={(text)=>{
                  this.setState({
                    contact: text
                  })
                }}
              />
              <TextInput
                placeholder="Address"
                style={styles.textInput2}
                onChangeText={(text)=>{
                  this.setState({
                    address: text
                  })
                }}
              />
              <TextInput
                placeholder="Nationality"
                style={styles.textInput2}
                onChangeText={(text)=>{
                  this.setState({
                    country: text
                  })
                }}
              />
              <TextInput
                placeholder="Email ID"
                style={styles.textInput2}
                keyboardType='email-address'
                onChangeText={(text)=>{
                  this.setState({
                    email: text
                  })
                }}
              />
              <TextInput
                placeholder="Password"
                style={styles.textInput2}
                secureTextEntry={true}
                onChangeText={(text)=>{
                  this.setState({
                    password: text
                  })
                }}
              />
              <TextInput
                placeholder="Confirm Password"
                style={styles.textInput2}
                secureTextEntry={true}
                onChangeText={(text)=>{
                  this.setState({
                    confirmPass: text
                  })
                }}
              />
              <View>
                <TouchableOpacity
                  style={styles.modalRegisterButton}
                  onPress={()=>{
                    this.userSignUp(this.state.email, this.state.password, this.state.confirmPass)
                  }}>
                  <Text style={{ alignSelf: 'center', marginTop: 4 }}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={()=>{
                    this.setState({isModalVisible: false})
                  }}>
                  <Text style={{ alignSelf: 'center', marginTop: 4 }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    )
  }

  userLogin = (email, password)=> {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
      ()=>{
        this.props.navigation.navigate('Request')
      }
    )
    .catch(
      (error)=>{
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage);
      }
    );
  }

  userSignUp = (email, password, confirmPassword)=> {
    if (password != confirmPassword) {
      alert('Passwords do not match');
    }
    else {
      firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(
      ()=>{
        db.collection('Users').add({
          Address: this.state.address,
          Age: this.state.age,
          Blood_Group: this.state.bloodGroup,
          Contact: this.state.contact,
          Country: this.state.country,
          Email_ID: this.state.email,
          First_Name: this.state.firstName,
          Last_Name: this.state.lastName,
          isDonateActive: false,
        })
        alert('User added successfully');

        this.setState({
          firstName: '',
          lastName: '',
          age: '',
          bloodGroup: '',
          contact: '',
          address: '',
          country: '',
          email: '',
          password: '',
          confirmPass: '',
        })
      }
    )
    .catch(
      (error)=>{
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage);
      }
    );
    }
  }


  render() {
    console.log('welcome');
    return (
      <View style = {styles.background}>
        <Text style={{fontSize: 25}}>
          User 1:
        </Text>
        <Text style={{fontSize: 25}}>
          Username: abc@gmail.com
        </Text>
        <Text style = {{fontSize: 25}}>
          Password: 123456*
        </Text>
        <Text>
         _
        </Text>
        <Text style={{fontSize: 25}}>
          User 2:
        </Text>
        <Text style={{fontSize: 25}}>
          Username: a@gmail.com
        </Text>
        <Text style = {{fontSize: 25}}>
          Password: 123456789
        </Text>
        <Text>
         _
        </Text>
        <View>
          {this.showModal()}
        </View>
        <Image
          source={require('../assets/icon.png')}
          style={{ 
            alignSelf: 'center', 
            width: 100, 
            height: 100, 
            marginTop: 60, 
            marginBottom: -20,
          }}
        />
        <Text style = {styles.appName}>
          Blood Share
        </Text>
        <TextInput
          style = {styles.email}
          placeholder = 'abc@email.com'
          onChangeText = {(text) => {
            this.setState({
              email: text,
            })
          }}
        />
        <TextInput
          style = {styles.password}
          placeholder = 'password'
          secureTextEntry = {true}
          onChangeText = {(text) => {
            this.setState({
              password: text,
            })
          }}
        />
        <TouchableOpacity
          style = {styles.loginButton}
          onPress = {() => {this.userLogin(this.state.email, this.state.password)}}
        >
          <Text style = {styles.buttonText1}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style = {styles.signupButton}
          onPress = {() => {this.setState({isModalVisible: true})}}
        >
          <Text style = {styles.buttonText2}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  backgroundModal: {
    width: '100%',
    backgroundColor: 'rgb(31, 168, 233)',
  },
  modalHeaderText: {
    alignSelf: 'center',
    fontSize: 30,
    marginBottom: 25,
    marginTop: 15,
  },
  textInput1: {
    alignSelf: 'center',
    backgroundColor: 'white',
    textAlign: 'center',
    height: 35,
    width: 250,
    borderColor: 'black',
    borderBottomWidth: 3,
    borderRadius: 5,
  },
  textInput2: {
    alignSelf: 'center',
    backgroundColor: 'white',
    textAlign: 'center',
    height: 35,
    width: 250,
    borderColor: 'black',
    borderBottomWidth: 3,
    marginTop: 15,
    borderRadius: 5,
  },
  modalRegisterButton: {
    alignSelf: 'center',
    marginTop: 25,
    backgroundColor: 'orange',
    width: 150,
    height: 30,
    marginBottom: 10,
    borderRadius: 5,
  },
  modalCancelButton: {
    alignSelf: 'center',
    backgroundColor: 'orange',
    width: 150,
    height: 30,
    marginBottom: 10,
    borderRadius: 5,
  },

  background: {
    flex: 1,
    backgroundColor: 'rgb(31, 168, 233)',
  },
  appName: {
    alignSelf: 'center',
    fontSize: 30,
    marginTop: 50
  },
  email: {
    backgroundColor: 'rgb(31, 168, 233)',
    alignSelf: 'center',
    textAlign: 'center',
    width: 375,
    height: 50,
    borderBottomWidth: 3,
    marginTop: 100,
    borderRadius: 6,
  },
  password: {
    backgroundColor: 'rgb(31, 168, 233)',
    alignSelf: 'center',
    textAlign: 'center',
    width: 375,
    height: 50,
    borderBottomWidth: 3,
    marginTop: 50,
    borderRadius: 6,
  },
  loginButton: {
    alignSelf: 'center',
    backgroundColor: 'orange',
    marginTop: 50,
    width: 160,
    height: 50,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText1: {
    alignSelf: 'center',
    marginTop: 13,
    fontSize: 15
  },
  signupButton: {
    alignSelf: 'center',
    backgroundColor: 'orange',
    marginTop: 15,
    width: 160,
    height: 50,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText2: {
    alignSelf: 'center',
    marginTop: 15,
    fontSize: 15,
  },
})