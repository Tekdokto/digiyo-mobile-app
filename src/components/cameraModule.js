// import React, { useState } from "react";
// import { View, Modal, TouchableOpacity } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// // import { Colors, Default } from "../constants/styles";
// import { Camera } from "expo-camera";
// import { Default } from "../constants/styles2";

// const CameraModule = (props) => {
//   const [type, setType] = useState(Camera.Constants.Type.back);
//   const [cameraRef, setCameraRef] = useState(null);

//   return (
//     <Modal
//       visible={true}
//       transparent={true}
//       animationType="slide"
//       onRequestClose={() => props.setShowCamera()}
//     >
//       <Camera
//         ratio="16:9"
//         type={type}
//         ref={(ref) => setCameraRef(ref)}
//         style={{ flex: 1 }}
//       >
//         <View
//           style={{
//             flex: 1,
//             justifyContent: "flex-end",
//             backgroundColor: Colors.transparent,
//           }}
//         >
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               alignItems: "center",
//               paddingHorizontal: Default.fixPadding * 2,
//               backgroundColor: Colors.regularDarkGrey,
//             }}
//           >
//             <TouchableOpacity
//               onPress={() => {
//                 props.setShowCamera();
//                 props.toggleCloseUploadImage();
//               }}
//             >
//               <Ionicons name="close" color={Colors.white} size={30} />
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={async () => {
//                 if (cameraRef) {
//                   let photo = await cameraRef.takePictureAsync();
//                   props.setPickedImage(photo);
//                   props.setShowCamera();
//                   props.toggleCloseUploadImage();
//                 }
//               }}
//             >
//               <View
//                 style={{
//                   justifyContent: "center",
//                   alignItems: "center",
//                   marginVertical: Default.fixPadding * 1.5,
//                   width: 50,
//                   height: 50,
//                   borderRadius: 25,
//                   borderWidth: 2,
//                   borderColor: Colors.white,
//                 }}
//               >
//                 <View
//                   style={{
//                     width: 40,
//                     height: 40,
//                     borderRadius: 20,
//                     backgroundColor: Colors.white,
//                   }}
//                 />
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => {
//                 setType(
//                   type === Camera.Constants.Type.back
//                     ? Camera.Constants.Type.front
//                     : Camera.Constants.Type.back
//                 );
//               }}
//             >
//               <Ionicons
//                 name="camera-reverse-outline"
//                 size={30}
//                 color={Colors.white}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Camera>
//     </Modal>
//   );
// };

// export default CameraModule;
