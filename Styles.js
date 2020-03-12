import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({

    //SEARCH SCREEN

    listContainer: {
      //backgroundColor: "#c4bcb1",
      backgroundColor: "#ab9885",
    },

    rowContainer: {
      flexDirection:"row",
    },

    colContainer: {
      flexDirection:"column",
    },

    businessContainer: {
      flexDirection:"column",
      marginTop: 8,
      borderRadius: 0,
      borderTopWidth: 4,
      borderTopColor: "rgba(255, 255, 255, .1)",
      //borderBottomWidth: 4,
      //borderBottomColor: "rgba(100, 100, 100, .1)",
      width:  Dimensions.get('window').width,
      height:  Dimensions.get('window').width / 2 + 75,
    },

    
    businessTouchContainer: {
      zIndex: 1, 
      width:  Dimensions.get('window').width ,
      height:  Dimensions.get('window').width / 2.5  + 45
    },

    rateFont: {
      fontSize: 18,
      fontFamily: 'monospace',
      color: "#cccac8"
    },

    minorFont: {
      color: "gray",
      fontStyle: 'italic'
    },

    basicFont: {
      fontSize: 18,
      fontFamily: 'Roboto',
      color: "gray",
    },

    titleFont: {
      fontFamily: 'sans-serif-light',
      fontSize: 17,
      color: "#59584f",
    },

    titleView: {
      flex: 1,
      margin: 12,
      marginLeft: 14,
    },

    businessPhotoContainer: {
      width: Dimensions.get('window').width / 2,
      height:  Dimensions.get('window').width / 2,
      marginLeft: 8,
    },

    photoStyle: {
      width: (Dimensions.get('window').width / 2),
      height:  (Dimensions.get('window').width / 2),
      borderRadius: 10,
      borderWidth: 3,
      borderColor: "rgba(255, 255, 255, 0.6)",
      overflow: "hidden",
    },

    imageMan: {
      marginTop: 8,
      zIndex: -1,
      width: (Dimensions.get('window').width / 6),
      height:  (Dimensions.get('window').width / 6),
      resizeMode: "contain",
      aspectRatio: 1/1,
    },

    imageClock: {
      marginLeft: 8,
      zIndex: -1,
      width: (Dimensions.get('window').width / 7.2),
      height:  (Dimensions.get('window').width / 7.2),
      resizeMode: "contain",
      aspectRatio: 1/1,
    },

    ratingTextContainer: {
      flex: 0.25,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },

    star: {
      width: Dimensions.get('window').width/3.5,
      alignItems: 'center',
      justifyContent: 'center',
    },

    starView: {
      marginRight: 12,
      flex: 0.75,
      overflow: "hidden",
      justifyContent: 'center',
    },

    lightStarImageContainer: { 
      overflow: "hidden",
      position: "absolute",

    },

    darkStarImageContainer: { 
      zIndex: -1,
      overflow: "hidden",
      position: "absolute",
      marginRight: "auto"
    },

    //HOME SCREEN

    mainContainer: {
      zIndex: -2,
      width: Dimensions.get('window').width-30,
      height: Dimensions.get('window').height-90,
      marginLeft: 15,
      marginTop: 45,
      marginBottom: 210,
      backgroundColor: "#e8e4da",
      borderRadius: 20,
    },

    picLogoContainer: { 
      width: 100,
      height: 100,
      marginTop: Dimensions.get('window').width/5,
      marginLeft: Dimensions.get('window').width/2 - 50 - 16,
      resizeMode: 'contain',
    },

    bannerAdHomeScreen: {
      right: 15,
      width: "100%",
      bottom: 0
    },

    bannerAdSearchScreen: {
      width: "100%",
      bottom: 50
    },

    statusContainer: {
      alignItems: 'center',
      flex: 1
    },

    statusFont: {
      fontSize: 17,
      color: "#b0a69d",
    },

    hintContainer: { 
      marginTop: 50,
      height: 40,
      alignItems: 'center',
    },

    hintFont: {
      fontSize: 17,
      color: "#8f7256",
    },

    spinnerImageContainer: { 
      zIndex: -2,
      resizeMode: "cover",
      width: Dimensions.get('window').width/2,
      height: Dimensions.get('window').width/2,
      position: 'absolute',
      marginLeft: Dimensions.get('window').width/5,
      marginTop: 50
    },

    cupImageContainer: { 
      zIndex: -2,
      resizeMode: "contain",
      width: Dimensions.get('window').width/2,
      height: Dimensions.get('window').width/2,
      position: 'absolute',
      marginLeft: Dimensions.get('window').width/5 + 3,
      marginTop: 50
    
    },

    searchTouchContainer: {
      width: Dimensions.get('window').width, 
      height:Dimensions.get('window').width, 
    },

  });