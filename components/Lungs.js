import React from "react";
import { Text, View, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Lungs = (props) => {
return (
	<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
	<Text style={{ color: "#006600", fontSize: 40 }}>Lungs Screen!</Text>
	<Ionicons name="ios-person-circle-outline" size={80} color="#006600" />
	</View>
);
};

Lungs.navigationOptions = (navData) => {
return {
	headerTitle: navData.navigation.getParam("username"),
};
};

export default Lungs;
