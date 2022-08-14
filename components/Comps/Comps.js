import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import StyledButton from '../../StyledButtom';
import styles from './styles';
const Comps = (props) => {
  const {title,navto,image}=props.Compos;

  return (
    <View style={styles.carContainer}>
      <ImageBackground
        source={image}
        style={styles.image}
      />

      <View style={styles.titles}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <StyledButton
          type="primary"
          content={navto}
        />
      </View>

    </View>
  );
};

export default Comps;