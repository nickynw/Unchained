import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, View, Image, Dimensions} from 'react-native';
import { styles } from '../Styles';

class RatingComponent extends Component {

  render() {
    return (
    <View style={styles.starView}>
        <View style={[styles.lightStarImageContainer, { width: Dimensions.get('window').width / 3.5 * this.props.item.rating / 5 }]}><Image source={require('../Images/starspng.png')} resizeMode="contain" style={styles.star} /></View>
        <View style={[styles.darkStarImageContainer, { width: Dimensions.get('window').width / 3.5 }]}><Image source={require('../Images/starspngdark.png')} resizeMode="contain" style={styles.star} /></View>
        <View style={styles.ratingTextContainer}>
        <Text style={styles.rateFont} >{this.props.item.rates}</Text>
        </View>
    </View>)
  }
}

export { RatingComponent };