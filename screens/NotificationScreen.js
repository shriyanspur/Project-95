import * as React from 'react';
import { Text, View, TouchableOpacity, FlatList} from 'react-native';
import { ListItem } from 'react-native-elements';
import SwipeList from '../components/swipeableFlatlist';
import firebase from 'firebase';
import db from '../config';
import AppHeader from '../components/AppHeader';

export default class NotificationScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userID: firebase.auth().currentUser.email,
      allNotification: []
    }
    this.ref = null
  }
  
  getNotification = () => {
    this.ref = db.collection('All_Notifications').where('RequestedUserID', '==', this.state.userID).where('Notification_Status', '==', 'Unread')
    .onSnapshot((snap)=> {
      var allNoti = []
      snap.docs.map((doc)=> {
        var notification = doc.data();
        notification['doc_id'] = doc.id
        allNoti.push(notification)
      })
      this.setState({
        allNotification: allNoti
      })
    })
  }
  
  keyExtractor = (item, index) => index.toString();

  renderItem = ({item, i}) => {
    return (
      <ListItem
        key = {i}
        title = {item.Name}
        subtitle = {'Donor: '+ item.Request_By + '\n Status: '+ item.Request_Status}
        titleStyle = {{color: 'black'}}
        bottomDivider
      />
    )
  }

  componentDidMount() {
      this.getNotification();
  }
  
  render() {
    return (
      <View>
        <View>
        {
          this.state.allNotification.length === 0
          ? (
            <View>
              <Text>
                You have no notifications
              </Text>
            </View>
          )
          : (
            <SwipeList notification = {this.state.allNotification}/>
          )
        }
        </View> 
      </View>
    )
  }
}