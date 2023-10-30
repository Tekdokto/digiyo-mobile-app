import {StyleSheet, } from 'react-native';
import { HEIGHT, WIDTH } from './sizes';
import { ACCENT_COLOR, PRIMARY_COLOR } from './colors';

const styles = StyleSheet.create({

  // homepost container
  container: {
    width: '100%',
    height: HEIGHT * 0.7,
  },
  videPlayButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
  },

  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 0
  },

  videoFull: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  uiContainer: {
    flex: 1,
    width: WIDTH,
    position: "absolute",
    bottom: 30,
    alignItems: "flex-end"
    // left: "12"
    // height: '100%',
    // justifyContent: 'flex-end',
  },
  bottomContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  handle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 10,
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  songName: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },

  songImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: '#4c4c4c',
  },

  //  right container
  rightContainer: {
    // flex: 1,
    // width: WIDTH*0.3,
    // flexDirection: "column",
    marginRight: 10,
    alignItems: "center",
    alignContent: "center" 
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },

  iconContainer: {
    alignItems: 'center',
  },
  statsLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
    textAlign: "center",
  },

    // full post container
    containerFull: {
      width: WIDTH,
      height: HEIGHT,
      // overflow: "hidden"
    },

  // full image frame
  mediaFullFrame: { 
    // borderRadius: 20, 
    height: HEIGHT, 
    width: WIDTH, 
    // overflow:"hidden"
},
  // image frame 
  mediaFrame: {  
    height: HEIGHT * 0.65, 
    width: WIDTH,
},
// mediaFrame: { 
//   borderRadius: 20, 
//   height: HEIGHT * 0.6, 
//   width: "100%" 
// },
iconText: {
  fontSize: HEIGHT * 0.02
},

  buttonGreen: {
    flexDirection: "row",
    // marginHorizontal: WIDTH * 0.35,
    paddingHorizontal: WIDTH * 0.1,
    paddingVertical: HEIGHT * 0.01,
    alignItems: "center",
    borderRadius: 3,
    borderWidth: 1.4,
    borderColor: ACCENT_COLOR,

  },
  buttonOrange: {
    flexDirection: "row",
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: WIDTH * 0.1,
    paddingVertical: HEIGHT * 0.01,
    alignItems: "center",
    borderRadius: 3,
    borderWidth: 1.4,
    borderColor: PRIMARY_COLOR,

  },
  flexRow: {
    flexDirection: "row", 
    alignItems: 'center', 
    alignContent: "center", 
    justifyContent: "space-between",
    
  },
  input: {
    width:WIDTH * 0.9, 
    marginVertical: 5, 
    backgroundColor:"#00000010", 
    borderRadius:10, 
    padding: 20
},
});

const generalStyles = StyleSheet.create({
    textInput: {
        borderColor: 'lightgray',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingVertical: 5,
    },
    avatarSmall: {
        height: 32,
        width: 32,
        borderRadius: 16
    }
});


export default styles;

 