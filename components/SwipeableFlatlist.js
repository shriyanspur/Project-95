import * as React from 'react';
import { View, Dimensions } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Icon, ListItem } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default class SwipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allNotifications: this.props.allNotification
    }
  }

  updateMarkAsRead = (notification) => {
    db.collection(All_Notifications).doc(notification.doc_id).update({
      NotificationStatus: 'Read'
    })
  }

  renderItem = (data) => {
    <ListItem 
      leftElement = {<Icon name = 'Book' type = 'font-awesome' color = '#696969'/>}
      title = {data.item.Book_Name}
      subtitle = {data.item.Message}
      bottomDivider
    />
  }

  renderHiddenItem = () => {
    <View style = {{backgroundColor: '#29B6F6', alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15}}>
      <View>
        <Text style = {{ fontSize: 17 }}>
        
        </Text>
      </View>
    </View>
  }

  onSwipeValueChange = (swipeData) => {
    var allNotifications = this.state.allNotifications;
    const { key, value } = swipeData;

    if(value < -Dimensions.get('window').width) {
      const newData = [...allNotifications];
      const previousIndex = allNotifications.findIndex(item => item.key === key)

      this.updateMarkAsRead(allNotifications[previousIndex])
      newData.splice(previousIndex, 1)

      this.setState({
        allNotifications: newData
      })
    }
  }

  render() {
    console.log(this.state.allNotifications)
    return (
      <View>
        <SwipeListView 
          disableRightSwipe
          data = {this.state.allNotifications}
          renderItem = {this.renderItem}
          renderHiddenItem = {this.renderHiddenItem}
          onSwipeValueChange = {this.onSwipeValueChange}
          rightOpenValue = { -Dimensions.get('window').width }
        />
      </View>
    )
  }
}