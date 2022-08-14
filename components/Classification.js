import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { fetch, bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as jpeg from 'jpeg-js'
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs');

export default function Classi() {
  const [image, setImage] = useState(null);
 const [imagelink,setImageLink]=useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64:true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setImageLink(result.base64);
    }
  };

  const [CovidClassi,setCovidClassi]=useState("");
  const [result,SetResult]=useState(null);
      useEffect(() => {
        async function loadModel(){
          //Wait for tensorflow module to be ready
        const tfReady = await tf.ready();
        //Replce model.json and group1-shard.bin with your own custom model
        const modelJson = await require("../assets/model.json");
        const modelWeight = await require("../assets/group1-shard.bin");
        const CovidClassi = await tf.loadLayersModel(bundleResourceIO(modelJson,modelWeight));
        setCovidClassi(CovidClassi)
        }
        loadModel()
      }, []); 

      function imageToTensor(rawImageData){
      const TO_UINT8ARRAY = true;
      const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
      // Drop the alpha channel info for mobilenet
      const buffer = new Uint8Array(width * height * 1);
      let offset = 0; // offset into original data
      for (let i = 0; i < buffer.length; i += 3) {
        buffer[i] = data[offset];
        buffer[i + 1] = data[offset + 1];
        buffer[i + 2] = data[offset + 2];
        offset += 4;
      }
      let imageTensor=tf.tensor3d(buffer, [width, height, 1]);
      imageTensor=imageTensor.resizeBilinear([100,100]).reshape([1,100,100,1])
       console.log(imageTensor);
      return imageTensor
      }
      
      const getImage=async()=>{
        try
        {
          const response =(await fetch(imagelink, {}, { isBinary: true }));
          const rawImageData = new Uint8Array(await response.arrayBuffer());
          const imageTensor = imageToTensor(rawImageData);
         let result = (await CovidClassi.predict(imageTensor).data());
         SetResult(result[0]>result[1]?"Negative":"Positive")

        }
        catch(error){
          console.log(error)
        }
      };
  return (
    <View style={{ justifyContent: 'center'}}>
<TextInput
        style={{height: 40}}
        placeholder="Give the link to JPEG X-RAY IMAGE"
        onChangeText={newText => setImageLink(newText)}
      />

    {{imagelink} &&
    <View>
      <Text>
        Given Image:-
      </Text>
      <Image source={{ uri: imagelink }} style={{ width: 200, height: 200 , justifyContent: 'center' }}
   />
    </View>
    
    }
      {{imagelink} && <Button title='CLassify' style={{padding:10, marginTop:10}} onPress={getImage} />}
      
        {result!==null?<Text>Result:-</Text>:<Text></Text>}
      {{result} && <Text style={{height:100}}> {result} </Text>}

    </View>
  );
}