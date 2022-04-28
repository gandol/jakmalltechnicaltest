import React from "react";
import {Text as DefaultText} from "react-native";

type DefaultTextProps = DefaultText["props"];

export const RegularText = (props: DefaultTextProps): React.ReactElement => {
    return (
        <DefaultText style={[{fontFamily: "Montserrat-Regular"}, props.style]}>
            {props.children}
        </DefaultText>
    );
};

export const BoldText = (props: DefaultTextProps): React.ReactElement => {
    return (
        <DefaultText style={[{fontFamily: "Montserrat-Bold"}, props.style]}>
            {props.children}
        </DefaultText>
    );
};

export const MediumText = (props: DefaultTextProps): React.ReactElement => {
    return (
        <DefaultText style={[{fontFamily: "Montserrat-Medium"}, props.style]}>
            {props.children}
        </DefaultText>
    );
};
