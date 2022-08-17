import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { fetch, bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as jpeg from 'jpeg-js'
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs');

export default function Classi() {
     const [imagelink,setImageLink]=useState("");
     const [CovidClassi,setCovidClassi]=useState("");
     const [result,SetResult]=useState("");
     const [error,setError]=useState(null);

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
     setImageLink(result.base64);
     }
     };

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
         setError("There is a error");
         }
     };
     const handleClear=()=>{
           setImageLink('')
           SetResult('')
     }
     return (
     <View style={{ justifyContent: 'center'}}>

          <SafeAreaView style={styles.container}>
          <View style={styles.parent}>
          <TextInput
          placeholder='Enter the Link of The Jpeg X-Ray Image'
          style={styles.textInput}
          value={imagelink}
          onChangeText={(value) => setImageLink(value)}
          />
          <TouchableOpacity
          style={styles.closeButtonParent}
          onPress={handleClear}
          >
          <Image
          style={styles.closeButton}
          source={require("../assets/closeImg.jpg")}
          />
     </TouchableOpacity>
     </View>
     </SafeAreaView>

     {imagelink!="" &&
     <View style={{flexDirection:'row', flexWrap:'wrap'}}>
     <Text style={styles.titles}>
     Given Image:
     </Text>
     <Image source={{ uri: imagelink }} style={styles.img}
     />
     </View>
     }
     {imagelink!="" && <Button title='CLassify' style={styles.button} onPress={getImage} />}

     <View style={{flexDirection:'row', flexWrap:'wrap',alignContent:'center'}}>
     {imagelink!=="" && result!='' && <Text style={styles.titles}>Result:{result}</Text>}
     </View>
     </View>
     );
     }

     const styles = StyleSheet.create({
     container: {
     flexDirection: "column",
     justifyContent: "center",
     marginTop:5,
     },
     titles:{
     fontSize:25,
     width: '100%',
     alignItems:'center',
     marginLeft:'30%',
     color:'green',
     marginTop:10
     },
     button:{
     fontSize:25,
     width: '100%',
     alignItems:'center',
     marginLeft:'30%',
     color:"#841584",
     marginTop:'5%',
     marginBottom:'10%'
     },
     img:{
     width: "100%", 
     height: 300 , 
     justifyContent: 'center',
     padding:100,
     },
     parent: {
     marginTop:20,
     borderColor: "blue",
     borderRadius: 30,
     borderWidth: 1,
     flexDirection: "row",
     justifyContent: "space-between",
     height:50,
     width:"95%",
     },
     closeButton: {
     height: 20,
     width: 25,
     },
     closeButtonParent: {
     justifyContent: "center",
     alignItems: "center",
     marginRight: 5,
     },
     })
