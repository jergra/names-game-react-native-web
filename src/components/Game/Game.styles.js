import { StyleSheet, Dimensions } from 'react-native';
import {colors} from '../../constants'

const screenWidth = Dimensions.get("window").width;

function getMarginTop() {
    if (screenWidth < 700) {
        return -2000
    }
    return 0
}  

function getMarginLeft() {
  if (screenWidth < 700) {
      return -1150
  }
  return 0
}  

export default StyleSheet.create({
    box: {
      flex: 1,
      //backgroundColor: 'blue',
      width: 'full',
      height: 'full',
      marginTop: -960
    },
    container: {
      flex: 1,
      backgroundColor: colors.black,
      width: 'full',
      height: 'full',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      //alignItems: 'center',
      color: colors.lightgrey,
      //color: 'teal',
      backgroundColor: colors.black,
      width: 2700,
      height: 1000,
      fontSize: 45,
      fontWeight: 'bold',
      letterSpacing: 7,
      paddingTop: 40,
      marginBottom: 80
    },
    
    map: {
      alignSelf: 'stretch',
      marginVertical: 20,
    },
    row: {
      alignSelf: 'stretch', 
      flexDirection: 'row',
      justifyContent: 'center'
    },
    cell: {
      borderWidth: 3,
      borderColor: colors.darkgrey,
      aspectRatio: 1,
      flex: 1, 
      margin: 3,
      maxWidth: 70,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cellText: {
      color: colors.lightgrey,
      fontWeight: 'bold',
      fontSize: 28
    },
  
  
  
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      width: 400,
      height: 650,
      marginTop: 40,
      backgroundColor: colors.black,
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      // shadowColor: "#000",
      // shadowOffset: {
      //   width: 0,
      //   height: 2
      // },
      //shadowOpacity: 0.25,
      //shadowRadius: 4,
      //elevation: 5
    },
    button: {
      borderRadius: 20,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 10,
      paddingBottom: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
      marginBottom: 40
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 25
    },
    modalText: {
      fontSize: 30,
      marginBottom: 30,
      textAlign: "center"
    },
  
  
    alertView: {
      marginTop: getMarginTop(),
      marginLeft: getMarginLeft(),
      width: 500,
      height: 200,
      backgroundColor: colors.lightgrey,
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
  
  
  });
  
//   export default StyleSheet.create({
//     map: {
//     alignSelf: 'stretch',
//     marginVertical: 20
//     },
//     row: {
//     alignSelf: 'stretch', 
//     flexDirection: 'row',
//     justifyContent: 'center'
//     },
//     cell: {
//     borderWidth: 3,
//     borderColor: colors.darkgrey,
//     aspectRatio: 1,
//     flex: 1, 
//     margin: 3,
//     maxWidth: 70,
//     justifyContent: 'center',
//     alignItems: 'center',
//     },
//     cellText: {
//     color: colors.lightgrey,
//     fontWeight: 'bold',
//     fontSize: 28
//     },



//     centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//     },
    
//     modalView: {
//     width: 400,
//     height: 650,
//     marginTop: 40,
//     backgroundColor: colors.black,
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     // shadowColor: "#000",
//     // shadowOffset: {
//     //   width: 0,
//     //   height: 2
//     // },
//     //shadowOpacity: 0.25,
//     //shadowRadius: 4,
//     //elevation: 5
//     },
//     button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2
//     },
//     buttonOpen: {
//     backgroundColor: "#F194FF",
//     marginBottom: 40
//     },
//     buttonClose: {
//     //backgroundColor: "#2196F3",
//     },
//     textStyle: {
//     //color: "white",
//     fontWeight: "bold",
//     textAlign: "center"
//     },
//     modalText: {
//     marginBottom: 15,
//     textAlign: "center"
//     }
// });