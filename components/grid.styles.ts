import {StyleSheet, ViewStyle} from 'react-native'
import {Color} from '../utils/colors'

const blockStyle = {
  width: 40,
  height: 40,
  borderRadius: 4,
  margin: 4,
  flex: 1,
  flexGrow: 1,
  flexBasis: 40,
};

export const blocksByColor: { [k in Color]: ViewStyle } = StyleSheet.create({
  [Color.Blue]: {
    backgroundColor: "#0074D9",
    ...blockStyle,
  },
  [Color.Red]: {
    backgroundColor: "#FF4136",
    ...blockStyle,
  },
  [Color.Green]: {
    backgroundColor: "#2ECC40",
    ...blockStyle,
  },
  [Color.Yellow]: {
    backgroundColor: "#FFDC00",
    ...blockStyle,
  },
});
