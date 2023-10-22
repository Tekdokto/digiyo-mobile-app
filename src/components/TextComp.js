//import liraries
import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import colors from '../styles/colors';
import { useSelector } from 'react-redux';
import fontFamily from '../constants/fontFamily';
import ThemeContext from '../theme/ThemeContext';
// import fontFamily from '../constants/fontFamily';
// import { textScale } from '../styles/responsiveSize';

// create a component
const TextComp = ({
    text = '',
    // children,
    size,
    color,
    // ...props
}) => {
    const theme = useContext(ThemeContext)
    // const {selectedTheme} = useSelector(state => state?.appSetting)

    return (
            <Text 

            style={{
                color: color ?? theme.color,
                fontSize: size,
            }}
            // {...props}
            >{text} </Text>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        // fontFamily: fontFamily.regular,
        // color: colors.whiteColor,
        // fontSize:textScale(12),
        // textAlign:'left'
    },
});


export default TextComp;
