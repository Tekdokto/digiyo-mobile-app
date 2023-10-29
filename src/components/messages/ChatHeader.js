import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/FontAwesome";
import ThemeContext from "../../theme/ThemeContext";
import { theme } from "../../constants/msgStyles";

// import { theme } from "../../theme";

const ChatHeader = ({ username, bio, picture, onlineStatus, onPress }) => {

	const themeCol = useContext(ThemeContext)

	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.backButton} onPress={onPress}>
				<Icon name="angle-left" size={30} 
				color={theme.color}
				 />
			</TouchableOpacity>
			<View style={styles.profileOptions}>
				<TouchableOpacity style={styles.profile}>
					<Image style={styles.image} source={{ uri: picture }} />
					<View style={styles.usernameAndOnlineStatus}>
						<Text style={styles.username}>{username}</Text>
						<Text style={styles.onlineStatus}>{onlineStatus}</Text>
					</View>
				</TouchableOpacity>
				<View style={styles.options}>
					<TouchableOpacity
						onPress={() => navigation.navigate("OnCallScreen", {
							username: username,
							picture: picture
						})}
						style={{ paddingHorizontal: 5 }}
					>
						<Icon
							name="phone"
							size={30}
							color={theme.color}
						/>
					</TouchableOpacity>
					<TouchableOpacity style={{ paddingHorizontal: 20 }}>
						<Icon
							name="ellipsis-v"
							size={30}
							color={theme.color}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: theme.color,
		paddingTop: 40,
		paddingBottom: 10,
	},
	backButton: {
		alignSelf: "center",
		paddingHorizontal: 10,
	},
	profileOptions: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 10,
	},
	profile: {
		flexDirection: "row",
		alignItems: "center",
		borderColor: "#fff",
		flex: 4,
	},
	image: {
		height: 65,
		width: 65,
		borderRadius: 32.5,
	},
	usernameAndOnlineStatus: {
		flexDirection: "column",
		justifyContent: "center",
		paddingHorizontal: 10,
	},
	username: {
		color: theme.color,
		fontSize: 18,
		fontFamily: "Bold",
	},
	onlineStatus: {
		color: theme.color,
		fontSize: 16,
	},
	options: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
});

export default ChatHeader;
