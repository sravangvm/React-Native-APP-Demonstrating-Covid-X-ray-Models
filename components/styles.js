import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  titles: {
    fontSize:25,
    width: '100%',
    alignItems:'center',
    marginLeft:'30%',
    color:'green',
    marginTop:'5%',
    marginBottom:'10%'
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    alignItems:'center',
    color:'orange',
    alignItems:'center',
    marginLeft:'2%'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },

  buttonsContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
  },
  Button:{
    position: 'absolute',
    bottom: 50,
    color:'green',
    width: '50%',
  }
});

export default styles;