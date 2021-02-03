import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Header, Icon, Badge } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class AppHeader extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userID: firebase.auth().currentUser.email,
      value: '',
    }
  }

  getNumberofUnreadNotifications = () => {
    db.collection('All_Notifications').where('NotificationStatus', '==', 'Unread').where('TargetUserID', '==', this.state.userID)
    .onSnapshot((snap)=>{
      var unreadNotifications = snap.docs.map((doc)=> {
        doc.data();
      })
      this.setState({
        value: unreadNotifications.length
      })
    })
  }

  BellIconWithBadge = () => {
    return (
      <View>
        <Icon 
          name='bell'
          type='font-awesome'
          color = '#696969'
          size = {25}
          onPress={()=>{this.props.navigation.navigate('Notifications')}}
        />
        <Badge 
          value = {this.state.value}
          containerStyle = {{position: 'absolute', top: -5, right: -7}}
        />
      </View>
    )
  }

  componentDidMount() {
    this.getNumberofUnreadNotifications();
  }

  render() {
    return (
      <Header
        leftComponent={<Icon name='bars' type='font-awesome' color = '#696969' onPress={()=> this.props.navigation.toggleDrawer()}/>}
        centerComponent={{ text: this.props.title, style: { color: 'white', fontSize: 28.064, marginTop: -5 }}}
        rightComponent={<this.BellIconWithBadge {...this.props}/>}
        containerStyle = {{ backgroundColor: 'red' }}
      />
    )
  }
}