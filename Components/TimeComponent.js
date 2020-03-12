import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, View, Image, Dimensions} from 'react-native';
import { styles } from '../Styles';


function getColor(timeleft) {
  if (timeleft == "Closed") {
    return "#8c2d2d"
  }
  if (timeleft == "(No data)") {
    return "#757575"
  }
  if (timeleft.includes("h")) {
    return "#0c6b00"
  }
  return "#917727"
}

class TimeComponent extends Component {

  render() {
    var openhours = <Text style={styles.minorFont}>{this.props.item.openhours}</Text>
    var timeleft = <Text style={{ color: getColor(this.props.item.timeleft), fontSize: 15 }}><Text style={{ fontWeight: "bold" }}>{this.props.item.timeleft}</Text></Text>;
    return (
      <View style={[styles.rowContainer, { height: Dimensions.get('window').width / 4 }]}>
        <View style={[{ alignItems: "center", justifyContent: "center", width: Dimensions.get('window').width / 6 }]}>
          <View><Image source={require('../Images/clockpng.png')} style={styles.imageClock} /></View>
        </View>
        <View style={[{ alignItems: "center", justifyContent: "center", width: Dimensions.get('window').width / 3 - 16 }]}>
          {timeleft}{openhours}
        </View>
      </View>)


  }
}

export { TimeComponent };