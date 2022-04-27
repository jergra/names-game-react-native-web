import { StyleSheet, Dimensions } from "react-native";
import { keys, colors } from "../../constants";

const screenWidth = Dimensions.get("window").width;
//console.log('screenWidth:', screenWidth)

function getAdjustment() {
  if (screenWidth <= 700) {
    const adjustment = screenWidth/8
    //console.log('small screen adjustment:', adjustment)
    return adjustment
  } 
  if (screenWidth > 700 && screenWidth <= 1200) {
    const adjustment = screenWidth/3
    //console.log('medium screen adjustment:', adjustment)
    return adjustment
  } 
  if (screenWidth > 1200) {
    const adjustment = screenWidth/2
    //console.log('large screen adjustment:', adjustment)
    return adjustment
  }
}

export const keyWidth = (screenWidth - getAdjustment()) / keys[0].length
//const keyHeight = keyWidth * 1.3;
const keyHeight = keyWidth * 1.0;

export default StyleSheet.create({
  keyboard: {
    alignSelf: "stretch",
    marginTop: "auto",
    marginBottom: 100
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  key: {
    width: keyWidth - 4,
    //width: 60,
    height: keyHeight - 4,
    //height: 60,
    margin: 2,
    borderRadius: 5,
    backgroundColor: colors.grey,
    justifyContent: "center",
    alignItems: "center",
  },
  keyText: {
    color: colors.lightgrey,
    fontWeight: "bold",
    fontSize: 25
  },
});
