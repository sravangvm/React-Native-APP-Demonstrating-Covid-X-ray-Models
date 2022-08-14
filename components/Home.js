import React, { useState } from "react";
import { Dimensions } from "react-native";
import { FlatList } from "react-native";
import {View, Text, ImageBackground} from 'react-native';
import Compos from './Compos';
import StyledButton from "../StyledButtom";
const Home = (props) => {
  const renderItem = (prop) => {
    const title=prop.title;
    const navto=prop.navto;
    const image=prop.image;
    return (
      <View style={styles.CompContainer}>
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
            content={"Get In"}
            onPress={() =>(navto==="Covid"?props.navigation.navigate('Covid'):props.navigation.navigate('Lungs'))}
          />
        </View>
  
      </View>
    );
  };
  return (
    <View style={styles.container}>
    <FlatList
      data={Compos}
      renderItem={({item}) => renderItem(item) }
      navigation={props.navigation}
      showsVerticalScrollIndicator={false}
      snapToAlignment={'start'}
      decelerationRate={'fast'}
      snapToInterval={Dimensions.get('window').height}
    />
    </View>
  );
};
  
export default Home;


const ht=Dimensions.get('window').height;
const styles= ({
    container: {
      height:ht,
    },
    image: {
      width:'100%',
      height:'115%',
      flex:1,
      position:'absolute',
      resizeMode: '',
      justifyContent: "center",
    },  
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0"
    },
    titles:{
      marginTop:'30%',
      width:'100%',
      alignItems:'center'
    },
    title:{
      fontSize:70,
      fontWeight:'500',
      color:'white',
      alignItems:'center',
    },
    buttonsContainer:{
      marginTop:'5%'
    }
  });
  