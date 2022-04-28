import React from "react";
import {Image, TouchableOpacity, View} from "react-native";
import {BoldText, MediumText, RegularText} from "../Text/DefaultText";
import Colors from "../../../constant/Colors";
import {JokeType} from "../../../util/type/JokesType";
import Modal from "react-native-modal";
import {useReduxDispatch} from "../../../redux";
import {setJokeOpen} from "../../../redux/state/JokeState";
import {JokeButton} from "../Button/JokeButton";

type JokeItemProps = {
    joke: JokeType;
};
export const JokeItem = ({joke}: JokeItemProps): React.ReactElement => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const toggleModal = () => setIsModalVisible(false);
    return (
        <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            style={{
                width: "100%",
                paddingVertical: 10,
                paddingHorizontal: 10,
                backgroundColor: Colors.background,
                borderBottomWidth: 0.5,
            }}>
            <RegularText>{joke.joke}</RegularText>
            <Modal
                isVisible={isModalVisible}
                onBackButtonPress={toggleModal}
                onBackdropPress={toggleModal}>
                <View
                    style={{
                        width: "90%",
                        backgroundColor: "white",
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        borderRadius: 8,
                    }}>
                    <RegularText>{joke.joke}</RegularText>
                    <View
                        style={{
                            width: "100%",
                            flexDirection: "row-reverse",
                            marginTop: 15,
                        }}>
                        <TouchableOpacity onPress={toggleModal}>
                            <BoldText style={{color: "red"}}>OK</BoldText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    );
};

type JokeListProps = {
    numberOfJokes: number;
    onPress?: React.ComponentProps<typeof TouchableOpacity>["onPress"];
    jokeCategory: string;
    jokeId: number;
    jokes: JokeType[];
    isOpened: boolean;
};
export const JokeList = ({
    numberOfJokes,
    jokeCategory,
    jokeId,
    jokes,
    isOpened,
}: JokeListProps): React.ReactElement => {
    const dispatch = useReduxDispatch();
    return (
        <View
            style={{
                width: "100%",
                backgroundColor: "white",
                marginTop: 10,
                paddingHorizontal: 10,
            }}>
            <TouchableOpacity
                onPress={() => {
                    dispatch(setJokeOpen({id: jokeId, open: !isOpened}));
                }}
                style={{
                    width: "95%",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    height: 50,
                    backgroundColor: Colors.background,
                    flexDirection: "row",
                    borderWidth: 0.5,
                    alignItems: "center",
                }}>
                <View style={{width: "50%", flexDirection: "row"}}>
                    <MediumText style={{color: "black"}}>
                        {numberOfJokes}
                    </MediumText>
                    <MediumText style={{marginLeft: 10, color: "black"}}>
                        {jokeCategory}
                    </MediumText>
                </View>
                {numberOfJokes == 1 ? (
                    <View
                        style={{
                            width: 100,
                            height: 50,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <View
                            style={{
                                paddingHorizontal: 5,
                                paddingVertical: 3,
                                backgroundColor: "#6FB2D2",
                            }}>
                            <MediumText>TOP</MediumText>
                        </View>
                    </View>
                ) : (
                    <JokeButton id={jokeId} />
                )}
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 10,
                        justifyContent: "center",
                        height: 50,
                    }}>
                    {isOpened ? (
                        <Image
                            source={require("../../../../assets/images/up.png")}
                            style={{width: 18, height: 18}}
                        />
                    ) : (
                        <Image
                            source={require("../../../../assets/images/down.png")}
                            style={{width: 18, height: 18}}
                        />
                    )}
                </View>
            </TouchableOpacity>
            {isOpened ? (
                <View
                    style={{
                        width: "93%",
                        marginLeft: "2%",
                        borderLeftWidth: 0.5,
                        borderRightWidth: 0.5,
                        borderBottomWidth: 0.5,
                    }}>
                    {jokes.map(joke => {
                        return (
                            <JokeItem
                                key={joke.id}
                                joke={joke}
                                // onPress={onPress}
                            />
                        );
                    })}
                </View>
            ) : null}
        </View>
    );
};
