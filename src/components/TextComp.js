//import liraries
import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import colors from '../styles/colors';
import ThemeContext from '../theme/ThemeContext';
// import fontFamily from '../constants/fontFamily';
// import { textScale } from '../styles/responsiveSize';

// create a component
const TextComp = ({
    text = '',
    // children,
    size,
    color,
    family
    // ...props
}) => {
    const theme = useContext(ThemeContext)
    
    return (
            <Text 

            style={{
                color: color ?? theme.color,
                fontSize: size,
                fontFamily: family ?? "Regular"
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
