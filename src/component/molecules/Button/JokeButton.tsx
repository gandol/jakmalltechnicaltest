import {TouchableOpacity} from "react-native";
import React from "react";
import {MediumText} from "../Text/DefaultText";
import {useReduxDispatch} from "../../../redux";
import {moveJokeToTop} from "../../../redux/state/JokeState";
import Colors from "../../../constant/Colors";

type JokeButtonProps = {
    id: number;
};
export const JokeButton = ({id}: JokeButtonProps): React.ReactElement => {
    const dispatch = useReduxDispatch();
    return (
        <TouchableOpacity
            onPress={() => {
                dispatch(moveJokeToTop({id: id}));
            }}
            style={{
                width: 100,
                height: 40,
                backgroundColor: Colors.goTop,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
            }}>
            <MediumText style={{color: "white"}}>Go Top</MediumText>
        </TouchableOpacity>
    );
};
