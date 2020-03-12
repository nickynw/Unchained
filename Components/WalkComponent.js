import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, View, Dimensions, Image} from 'react-native';
import { styles } from '../Styles';

function getDuration(time) {
    if (time == 1) {
      return time + " min"
    }
    if (time >= 60) {
      var hours = Math.floor(time / 60);
      var minutes = time % 60;
      return `${hours}h ${minutes} mins`;
    }
    return time + " mins"
  }

class WalkComponent extends Component {

    render() {
        return (
            <View style={[styles.rowContainer, { alignItems: "center", justifyContent: "center", height: Dimensions.get('window').width / 4 }]}>
                <View style={[{ width: Dimensions.get('window').width / 6 }]}>
                  <View><Image source={require('../Images/walkman.png')} style={styles.imageMan} /></View>
                </View>
                <View style={[{ alignItems: "center", justifyContent: "center", width: Dimensions.get('window').width / 3 - 16 }]}>
                  <Text style={styles.basicFont}>{getDuration(this.props.item.duration)}</Text>
                  <Text style={styles.minorFont}>{(this.props.item.distance).replace("mi", "miles")}</Text>
                </View>
            </View>
        )
    }
}

export { WalkComponent };
