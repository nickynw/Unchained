import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, View} from 'react-native';
import { styles } from '../Styles';

function getAddress(name, address) {
    let addressN = address.length;
    let totalN = 27;
    let addr = address;
    if (addressN > totalN) {
      addr = address.slice(0, totalN);
      if (addr.includes(",")) {
        addr = address.slice(0, addr.lastIndexOf(",", addr.length));
      }
    }
    if (name.length < 22) {
      return <Text>{"\n"}{addr}</Text>
    }
    return <Text></Text>
}

class TitleComponent extends Component {

    render() {
        return (
            <View style={[styles.titleView]}>
                <Text>
                    <Text style={styles.titleFont}>{this.props.item.name}</Text>
                    <Text style={styles.minorFont}>{getAddress(this.props.item.name, this.props.item.address)}</Text>
                </Text>
            </View>
        )
    }
}

export { TitleComponent };


