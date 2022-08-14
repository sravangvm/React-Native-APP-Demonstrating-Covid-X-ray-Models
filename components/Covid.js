import React from "react";
import { Text, View, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import DropdownComponent from "./Dropdown";
const Covid = (props) => {
return (
	<View>
	<Text style={styles.titles}>Covid Section </Text>
	<Text style={styles.title}>
		Please Select an Option from the below dropdown
	</Text>
	<DropdownComponent/>
	</View>
);
};
export default Covid;