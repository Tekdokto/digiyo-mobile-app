// import { ms } from "react-native-size-matters/extend";

import { ACCENT_COLOR, PRIMARY_COLOR } from "./colors";

export const Colors = {
  primary: PRIMARY_COLOR,
  extraDarkPrimary: PRIMARY_COLOR,
  // extraDarkPrimary: "#A811DA",
  black: "#0C110D",
  white: "#FFFFFF",
  transparent: "transparent",
  transparentBlack: "#00000080",
  transparentWhite: "#FFFFFF30",
  transparentPrimary: "#BF5AE099",
  transparentDarkPrimary: "#A811DA79",
  grey: "#949494",
  lightGrey: "#8D8D8D50",
  darkGrey: "#333333",
  extraDarkGrey: "#23242450",
  doveGray: "#757171",
  extraLightGrey: "#E7E6E6",
  regularGrey: "#B4B4B4",
  regularDarkGrey: "#000000",
  lightRegularGrey: "#ADA0B1",
  red: "#FF0F00",
  lightRed: "#EF1717",
  yellow: "#F1DE34",
  blue: "#1E4799",
  green: "#1E996D",
};
export const Fonts = {
  SemiBold28white: {
    fontFamily: "SemiBold",
    fontSize: 28,
    color: Colors.white,
  },
  SemiBold22white: {
    fontFamily: "SemiBold",
    fontSize: 22,
    color: Colors.white,
  },
  SemiBold14white: {
    fontFamily: "SemiBold",
    fontSize: 14,
    color: Colors.white,
  },
  SemiBold18white: {
    fontFamily: "SemiBold",
    fontSize: 18,
    color: Colors.white,
  },
  SemiBold16white: {
    fontFamily: "SemiBold",
    fontSize: 16,
    color: Colors.white,
  },
  SemiBold12white: {
    fontFamily: "SemiBold",
    fontSize: 12,
    color: Colors.white,
  },
  SemiBold14black: {
    fontFamily: "SemiBold",
    fontSize: 14,
    color: Colors.black,
  },
  SemiBold14grey: {
    fontFamily: "SemiBold",
    fontSize: 14,
    color: Colors.grey,
  },
  SemiBold16grey: {
    fontFamily: "SemiBold",
    fontSize: 16,
    color: Colors.grey,
  },
  SemiBold18grey: {
    fontFamily: "SemiBold",
    fontSize: 18,
    color: Colors.grey,
  },
  SemiBold14regularGrey: {
    fontFamily: "SemiBold",
    fontSize: 14,
    color: Colors.regularGrey,
  },
  SemiBold16primary: {
    fontFamily: "SemiBold",
    fontSize: 16,
    color: Colors.primary,
  },
  SemiBold18primary: {
    fontFamily: "SemiBold",
    fontSize: 18,
    color: Colors.primary,
  },
  Bold18white: {
    fontFamily: "Bold",
    fontSize: 18,
    color: Colors.white,
  },
  Bold14white: {
    fontFamily: "Bold",
    fontSize: 14,
    color: Colors.white,
  },
  Bold18primary: {
    fontFamily: "Bold",
    fontSize: 18,
    color: Colors.primary,
  },
  Bold14primary: {
    fontFamily: "Bold",
    fontSize: 14,
    color: Colors.primary,
  },
  Medium12grey: {
    fontFamily: "Medium",
    fontSize: 12,
    color: Colors.grey,
  },
  Medium14grey: {
    fontFamily: "Medium",
    fontSize: 14,
    color: Colors.grey,
  },
  Medium14lightRegularGrey: {
    fontFamily: "Medium",
    fontSize: 14,
    color: Colors.lightRegularGrey,
  },
  Medium16grey: {
    fontFamily: "Medium",
    fontSize: 16,
    color: Colors.grey,
  },
  Medium14primary: {
    fontFamily: "Medium",
    fontSize: 14,
    color: Colors.primary,
  },
  Medium14lightGrey: {
    fontFamily: "Medium",
    fontSize: 14,
    color: Colors.lightGrey,
  },
  Medium14white: {
    fontFamily: "Medium",
    fontSize: 14,
    color: Colors.white,
  },
  Medium16white: {
    fontFamily: "Medium",
    fontSize: 16,
    color: Colors.white,
  },
  Medium16black: {
    fontFamily: "Medium",
    fontSize: 16,
    color: Colors.black,
  },
  Medium12white: {
    fontFamily: "Medium",
    fontSize: 12,
    color: Colors.white,
  },
  Regular14grey: {
    fontFamily: "Regular",
    fontSize: 14,
    color: Colors.grey,
  },
  Regular14white: {
    fontFamily: "Regular",
    fontSize: 14,
    color: Colors.white,
  },
};

export const Default = {
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 8,
  },
  shadowBtn: {
    shadowColor: Colors.transparentPurple,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },

  fixPadding: 10,
};
export default { Colors, Fonts, Default };
