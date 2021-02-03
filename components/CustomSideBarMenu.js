import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import WelcomeScreen from '../screens/welcomeScreen';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import db from '../config';
import firebase from 'firebase';

export default class CustomSideBarMenu extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        User_ID: firebase.auth().currentUser.email,
        image: '#',
        doc_id: '',
        name: '',
      }
  }

  selectPic = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    })

    if (!cancelled) {
      this.uploadImage(uri, this.state.User_ID)
    }
  }

  uploadImage = async(uri, imageName) => {
    var response = await fetch(uri)
    var blob = await response.blob()
    var ref = firebase.storage().ref().child('User_Profiles/' + imageName)

    return ref.put(blob).then((response)=>{
      this.fetchImage(imageName)
    })
  }

  fetchImage = (imageName) => {
    var ref = firebase.storage().ref().child('User_Profiles/' + imageName)

    ref.getDownloadURL().then((url)=>{
      this.setState({
        image: url
      })
    })
    .catch((error)=>{
      this.setState({
        image: '#',
      })
    })
  }

  getUserProfile = () => {
    db.collection('Users').where('Email_ID', '==', this.state.User_ID).onSnapshot((snap)=> {
      snap.forEach((doc)=> {
        var data = doc.data() 
        this.setState({
          name: data.First_Name + ' ' + data.Last_Name,
          doc_id: doc.id,
          image: data.image
        })
      })
    })
  }

  componentDidMount() {
    this.fetchImage(this.state.User_ID);
    this.getUserProfile();
  }

  render() {
    return (
      <View style = {{flex: 1}}>
        <View>
          <Avatar 
            rounded
            source = {{uri: this.state.image}}
            size = 'medium'
            showEditButton
            onPress = {() => {
              this.selectPic()
            }}
          />
        </View>
        <View>
          <DrawerItems {...this.props}/>
        </View>
        <View>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={()=> {
              this.props.navigation.navigate('welcomeScreen')
              firebase.auth().signOut()
          }}>
            <Text>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  logoutButton: {
    marginLeft: 15,
    marginTop: 550,
  }
})