import {StyleSheet, ViewStyle} from 'react-native'
import {Color} from './utils/colors'

const blockStyle = {
  width: 30,
  height: 30,
  borderRadius: 4,
  margin: 4,
  flex: 1,
  flexGrow: 1,
  flexBasis: 30,
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
