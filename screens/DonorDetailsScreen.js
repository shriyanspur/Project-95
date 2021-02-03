import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, FlatList} from 'react-native';
import { Card } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class DonorDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userID: firebase.auth().currentUser.email,
      receiverID: this.props.navigation.getParam('details')['User_ID'],
      requestID: this.props.navigation.getParam('details')['Request_ID'],
      BookName: this.props.navigation.getParam('details')['Book_Name'],
      Reason: this.props.navigation.getParam('details')['Reason'],
      receiverName: '',
      receiverContact: '',
      receiverAddress: '',
      receiverRequestDocID: '',
    }
  }

  getUserDetails = (userID) => {
    db.collection('Users').where('Email_ID', '==', userID).get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        this.setState({
          userName: doc.data().First_Name + ' ' + doc.data().Last_Name
        })
      })
    })
  }

  getReceiverDetails = () => {
    db.collection('Users').where('Email_ID', '==', this.state.receiverID).get()
    .then((snapshot)=> {
      snapshot.forEach((doc)=> {
        this.setState({
          receiverName: doc.data().First_Name,
          receiverContact: doc.data().Contact,
          receiverAddress: doc.data().Address,
        })
      })
    })
    db.collection('Requests').where('Request_ID', '==', this.state.requestID).get()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        this.setState({
          receiverRequestDocID: doc.id
        })
      })
    })
  }

  addNotification = () => {
    var message = this.state.userName + ' has requested for blood';

    db.collection('All_Notifications').add({
      TargetUserID: this.state.receiverID,
      Donor_ID: this.state.userID,
      Request_ID: this.state.requestID,
      Book_Name: this.state.BookName,
      RequestDate: firebase.firestore.FieldValue.serverTimestamp(),
      NotificationStatus: 'Unread',
      Message: message,
    })
  }

  componentDidMount() {
    this.getReceiverDetails();
    this.getUserDetails(this.state.userID);
  }
    
  render() {
    return (
      <View>
        <View>
          <Card title={'Donor Info'} titleStyle={{fontSize: 15, alignSelf: 'center'}}>
            <Card>
              <Text>
                Name: {this.state.BookName}
              </Text>
            </Card>
            <Card>
              <Text>
                Reason: {this.state.Reason}
              </Text>
            </Card>
          </Card>
        </View>

        <View>
          <Card title={'Receiver Info'} titleStyle={{fontSize: 15, alignSelf: 'center'}}>
            <Card>
              <Text>
                Name: {this.state.receiverName}
              </Text>
            </Card>
            <Card>
              <Text>
                Contact: {this.state.receiverContact}
              </Text>
            </Card>
            <Card>
              <Text>
                Address: {this.state.receiverAddress}
              </Text>
            </Card>
          </Card>
        </View>

        <View>
          {
            this.state.receiverID != this.state.userID
            ? (
                <TouchableOpacity onPress={()=>{
                  this.updateBookStatus();
                  this.addNotification();
                  this.props.navigation.navigate('MyDonations')
                }}>
                  <Text>
                    I want to Donate
                  </Text>
                </TouchableOpacity>
            )
            : (
                null
            )
          }
        </View>
      </View>
    )
  }
}