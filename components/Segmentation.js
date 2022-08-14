import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { fetch, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as jpeg from 'jpeg-js'
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs');

export default function Segment() {
    const [image, setImage] = useState(null);
    const [mask,setMask]= useState(null);
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };
    const pickMask = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setMask(result.uri);
        }
      };
    return (
      <View style={{ justifyContent: 'center'}}>
  
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 , justifyContent: 'center' }}/>}
        <Button title="Pick a CT_SCAN to Segment" style={{padding:10}} onPress={pickImage} />

        {mask && <Image source={{ uri: mask }} style={{ width: 200, height: 200 , justifyContent: 'center' }} />}
        <Button title="Pick a Mask cooresponding to the CT_SCAN" style={{padding:10}} onPress={pickMask} />

        {image && <Button title='SEGMENT' style={{padding:10, marginTop:10}} />}
    </View>
    );
  }