import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { theme } from '../constants/msgStyles';
import MyStatusBar from './MyStatusBar';
import ThemeContext from '../theme/ThemeContext';

// import ProfileInfo from './common/ProfileInfo';

const ConversationItem = ({ picture, username, bio, lastMessage, time, isBlocked, isMuted, notification, hasStory }) => {

	const themeCol = useContext(ThemeContext)
	const [modalVisible, setModalVisible] = useState(false);
	const navigation = useNavigation();

	const showStoryCircle = () => {
		if (hasStory) {
			return {
				borderColor: theme.colors.storyBorder,
				borderWidth: 2
			}
		}
	};

	const showNotification = (type) => {
		if (notification && type === "number") {
			return (
				<View style={styles.notificationCircle}>
					<Text style={styles.notification}>{notification}</Text>
				</View>
			);
		} else if (notification && type === "imageCircle") {
			return {
				// borderColor: theme.colors.primary
			}
		}
	};

	return (
		<View style={styles.container}>
			<MyStatusBar />
			<TouchableOpacity style={styles.conversation}
			onPress={() => navigation.navigate('messagesScreen', {
				username: username,
				bio: bio,
				picture: picture,
				isBlocked: isBlocked,
				isMuted: isMuted
			})}>
				<TouchableOpacity 
					onPress={() => setModalVisible(currentValue => !currentValue)}
					style={[styles.imageContainer, showStoryCircle()]}>
					<Image style={styles.image} source={{ uri: picture }} />
				</TouchableOpacity>
				<View style={{
						flex: 1,
						justifyContent: 'center'
					}}>
					<View style={{
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}>
						<Text numerOfLine={1} style={[styles.username, {color:themeCol.color}]}>{username}</Text>
						<Text style={[styles.time]}>{time}</Text>
					</View>
					<View style={{
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}>
						<Text style={[styles.message, {color:themeCol.color}]}>{lastMessage}</Text>
						{showNotification('number')}
					</View>
				</View>
			</TouchableOpacity>
			<Modal animationType="slide" transparent visible={modalVisible}>
				{/* <ProfileInfo
					username={username}
					picture={picture}
					bio={bio}
					isBlocked={isBlocked}
					isMuted={isMuted}
					hide={() => setModalVisible(false)}
				/> */}
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {

	},
	conversation: {
		flexDirection: 'row',
		paddingBottom: 25,
		paddingRight: 20,
		paddingLeft: 10
	},
	imageContainer: {
		marginRight: 15,
		borderRadius: 25,
		height: 50,
		width: 50,
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center' 
	},
	image: {
		height: 55,
		width: 55
	},
	username: {
		fontSize: theme.fontSize.title,
		color: theme.colors.title,
		width: 210
	},
	message: {
		fontSize: theme.fontSize.message,
		width: 240,
		color: theme.colors.subTitle
	},
	time: {
		fontSize: theme.fontSize.subTitle,
		color: theme.colors.subTitle,
		fontWeight: '300'
	},
	notificationCircle: {
		backgroundColor: theme.colors.primary,
		borderRadius: 50,
		height: 20,
		width: 20,
		marginRight: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	notification: {
		// color: theme.colors.white,
		fontWeight: 'bold',
		fontSize: 10
	}
})

export default ConversationItem