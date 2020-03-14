import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Dimensions, Linking, Text, TouchableOpacity, View, FlatList, SafeAreaView, Image } from 'react-native';
import { styles } from '../Styles';
import { TimeComponent } from '../Components/TimeComponent';
import { TitleComponent } from '../Components/TitleComponent';
import { WalkComponent } from '../Components/WalkComponent';
import { RatingComponent } from '../Components/RatingComponent';
import {
  AdMobBanner,
} from 'expo-ads-admob';
import {adkey2} from '../ApiKeys';

//Provides placeholder graphic if no photo is found for business
function getPhoto(item) {
  if (item.imageurl == "none") {
    return <Image source={require('../Images/placeholder.png')} style={styles.photoStyle} />
  }
  return <Image source={{ uri: item.imageurl }} style={styles.photoStyle} />

}

//Opens gmaps / apple maps and sends directs user to selected business location
function openMap(latitude, longitude, name, address) {
  var googleURL = `https://www.google.com/maps/dir/?api=1&origin=$latitude,$longitude&destination=$destination&travelmode=walking`
  googleURL = googleURL.replace("$latitude", latitude).replace("$longitude", longitude);
  var destination = name + "," + address;
  googleURL = googleURL.replace("$destination", destination);
  if (Platform.OS === "ios") {
    //TO DO
    Linking.openURL('http://maps.apple.com/maps?daddr=')
  } else {
    Linking.openURL(googleURL);
  }
}

//Changes the colour of the container based on if it is a chain, and if it is open or not right now
function getContainerColor(item) {
  /*
  if(item.timeleft=="(No data)" && item.ischain!="true"){
    return "#d9d5d0"
  }*/
  if (item.timeleft == "Closed" && item.ischain == "true") {
    return "#b5a19e"
  }
  if (item.timeleft == "Closed" && item.ischain != "true") {
    return "#fad8d2"
  }
  if (item.timeleft != "Closed" && item.ischain == "true") {
    return "#b5aa9e"
  }
  return "#e6e3d8"
  //return "#f5f4ed"
}

class FlatListItem extends Component {
  render() {
    return (
      <View key={this.props.item.name} style={[{ backgroundColor: getContainerColor(this.props.item) }, styles.businessContainer]}>
        <TouchableOpacity style={styles.businessTouchContainer} onLongPress={() => { openMap(this.props.latitude, this.props.longitude, this.props.item.name, this.props.item.address); }}>

          <View style={styles.rowContainer}>

            <TitleComponent item={this.props.item} />

            <RatingComponent item={this.props.item} />

          </View>

          <View style={[styles.rowContainer]}>

            <View style={styles.businessPhotoContainer}>{getPhoto(this.props.item)}</View>

            <View style={[styles.colContainer, { width: Dimensions.get('window').width / 2.1 }]}>
         
              <WalkComponent item={this.props.item} />

              <TimeComponent item={this.props.item} />
            
            </View> 

          </View>

        </TouchableOpacity>
      </View>
    );
  }
}


function SearchScreen({ route, navigation }) {
  const params = route.params;
  params.outerSpinner.stopAnimation();
  params.innerSpinner.stopAnimation();
  var places = params.data.places;
  var latitude = params.data.latitude;
  var longitude = params.data.longitude;
  if(places.length ==0){
    return (
      <View style={[styles.statusContainer, {marginTop: 50}]}><Text style={styles.statusFont}>There appears to be no results.</Text></View>
    )
  }
  return (
    <SafeAreaView style={[styles.listContainer, { flex: 1 }]}>

      <View style={{ marginBottom: 52 }}>
        <FlatList
          data={places}
          keyExtractor={(item, index) => item.name}
          renderItem={({ item, index }) => {
            return (
              <FlatListItem item={item} index={index} latitude={latitude} longitude={longitude}/>
            );
          }}
        />
      </View>

      <AdMobBanner
          style={styles.bannerAdSearchScreen}
          adSize="fullBanner"
          adUnitID={adkey2}
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={error => console.error(error)}/>
          
    </SafeAreaView>
    
  );
}


export { SearchScreen };