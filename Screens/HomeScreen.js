import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { styles } from '../Styles';
import { getData } from '../Scripts/RequestData';
import firebase from 'firebase';
import { fakeData } from '../Scripts/RequestFakeData'
import NetInfo from '@react-native-community/netinfo';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import {hiddenconfig, adkey1, adkey2} from '../ApiKeys'
import {
  AdMobBanner,
} from 'expo-ads-admob';
const testing = false;
const config = {
  apiKey: hiddenconfig.apiKey,
  authDomain: hiddenconfig.authDomain,
  databaseURL: hiddenconfig.databaseURL,
  projectId: hiddenconfig.projectId,
  storageBucket: hiddenconfig.storageBucket,
  messagingSenderId: hiddenconfig.messagingSenderId,
};

function HomeScreen({ navigation }) {
  return (

    <View style={[styles.mainContainer]}>

      <View ><Image style={styles.picLogoContainer} source={require('../Images/logo.png')} /></View>

      <View style={styles.hintContainer}><Text style={styles.hintFont}>Press and Hold results for directions.</Text></View>

      <View><SearchButton navigation={navigation} /></View>

      <AdMobBanner
        style={styles.bannerAdHomeScreen}
        adSize="fullBanner"
        adUnitID={adkey1}
        testDevices={[AdMobBanner.simulatorId]}
        onAdFailedToLoad={error => console.error(error)}/>

    </View>

  );
}

class SearchButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chains: [],
      outerSpinner: new Animated.Value(0),
      innerSpinner: new Animated.Value(0),
      time: 0,
      data: "none",
      location: "no_location",
      status: "Touch below to search for nearby cafes."
    }
  }

  componentDidMount() {
    if (!firebase.apps.length) { firebase.initializeApp(config); }
    //Uncomment to add things to database
    /*firebase.database().ref("chains/5").set({
      name: "Caffè Nero"
    }).then(() => {
      console.log("inserted");
    }).catch((error) => {
      console.log(error);
    })*/
    firebase.database().ref("chains").once('value', (data) => {
      let arr = [];
      let info = data.toJSON();
      for (var i = 1; i < Object.keys(info).length + 1; i++) {
        arr.push(info[i].name);
      }
      this.setState({
        chains: arr
      });
      //console.log("Chains read in: ")
      //console.log(this.state.chains);
    })
  }

  handleClick() {
    //Perform data request only if first click, or within 5 mins of previous search, with internet connection and location permission
    getLocationWithPermission()
      .then(location => this.setState({ location: location }))
      .then(() => {
        NetInfo.fetch()
          .then(state => {
            if (state.isConnected && delayRequirement(this.state.time) && this.state.location != "no_location") {
              this.setState({ time: new Date() })
              this.setState({ status: "Searching" })
              runAnimation(this.state.outerSpinner, 2);
              runAnimation(this.state.innerSpinner, -2);
              if (testing == true) {
                setTimeout(() => {
                  this.setState({ data: fakeData(this) })
                  this.props.navigation.navigate('Search', { data: fakeData(this), innerSpinner: this.state.innerSpinner, outerSpinner: this.state.outerSpinner });
                }, 3000);
              }
              else {
                getData(this).then(data => this.props.navigation.navigate('Search', { data: this.state.data, innerSpinner: this.state.innerSpinner, outerSpinner: this.state.outerSpinner }));
              }
              //Scenarios for if data is previously loaded from earlier search, no location, no internet.
            } else {
              if (this.state.data != "none") {
                this.setState({ status: "Search Results Ready - Touch Below" })
                this.props.navigation.navigate('Search', { data: this.state.data, innerSpinner: this.state.innerSpinner, outerSpinner: this.state.outerSpinner })
              }
              if (this.state.location == "no_location") {
                this.setState({ status: "Search Requires Location Permission." })
              }
              if (!state.isConnected) {
                this.setState({ status: "Search Requires Internet Connection." })
              }
            }
          });
      })
  }

  render() {
    const spinValues = {
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    }
    const spin1 = this.state.outerSpinner.interpolate(spinValues);
    const spin2 = this.state.innerSpinner.interpolate(spinValues);
    return (
      <View >

        <View style={styles.statusContainer}><Text style={styles.statusFont}>{this.state.status}</Text></View>

        <Animated.Image
          style={[styles.spinnerImageContainer, { transform: [{ rotate: spin1 }] }]}
          source={require('../Images/innerspinner.png')} />

        <Animated.Image
          style={[styles.spinnerImageContainer, { transform: [{ rotate: spin2 }] }]}
          source={require('../Images/outerspinner.png')} />

        <Image style={styles.cupImageContainer} source={require('../Images/cup.png')} />

        <TouchableOpacity style={styles.searchTouchContainer} onPress={() => { this.handleClick() }} />

      </View>
    );
  }
}

//Ask's user for permission and returns location data
async function getLocationWithPermission() {
  try {
    const permission = await Permissions.getAsync(Permissions.LOCATION);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.LOCATION);
      if (newPermission.status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        return location;
      } else {
        return "no_location";
      }
    } else {
      let location = await Location.getCurrentPositionAsync({});
      return location;
    }
  } catch (error) {
    console.log(error);
    return "no_location";
  }
}

//Animates two spinning circles when app is loading data
function runAnimation(spinObject, value) {
  spinObject.setValue(0);
  Animated.timing(spinObject,
    {
      toValue: value,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start((o) => {
      if (o.finished) {
        runAnimation(spinObject, value);
      }
    });
}

//If first click, allow, otherwise ensure its been 5 minutes since the last click. (To save me money on google maps api)
function delayRequirement(time) {
  if (time == 0) {
    return true
  }
  var date = new Date();
  let ndiff = date - time;
  var difference = Math.floor(ndiff / 1000 / 60);
  if (difference > 5) {
    return true
  }
  return false
}

export { HomeScreen };





