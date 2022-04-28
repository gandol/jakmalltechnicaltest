import React, {useEffect} from "react";
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    View,
} from "react-native";
import {JokeList} from "../component/molecules/Joke/Joke";
import {useReduxDispatch, useReduxSelector} from "../redux";
import {getJokeList, resetJokeList, setJokes} from "../redux/state/JokeState";
import ApiCall from "../util/helper/ApiCall";
import Endpoints from "../constant/Endpoints";
import {DataJokesType, JokeType} from "../util/type/JokesType";
import Colors from "../constant/Colors";

export default function MainApp(): React.ReactElement {
    const [refreshing, setRefreshing] = React.useState(false);

    const dispatch = useReduxDispatch();
    const jokeList = useReduxSelector(getJokeList);

    const getJokeListData = async (category: string) => {
        try {
            const {data} = await ApiCall.get(
                `${Endpoints.joke}${category}?type=single&amount=2`,
            );
            const dataReturn: JokeType[] = [];
            data.jokes.forEach((joke: any) => {
                dataReturn.push({
                    id: Math.random(),
                    joke: joke.joke,
                });
            });
            return dataReturn;
        } catch (e) {
            return [];
        }
    };

    const getCategories = async () => {
        try {
            dispatch(resetJokeList());
            const {data} = await ApiCall.get(Endpoints.categories);
            const categories = data.categories;
            const CategoryWithJoke: DataJokesType[] = [];
            for (let i = 0; i < categories.length; i++) {
                const categori = categories[i];
                const jokeListItems = await getJokeListData(categori);
                CategoryWithJoke.push({
                    id: Math.random(),
                    name: categori,
                    jokes: jokeListItems,
                    isOpen: false,
                });
            }
            setRefreshing(false);
            dispatch(setJokes(CategoryWithJoke));
        } catch (e) {
            return;
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    if (jokeList.length === 0) {
        return <ActivityIndicator size="small" color={Colors.activity} />;
    }
    return (
        <View style={{flex: 1, backgroundColor: "white"}}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={getCategories}
                    />
                }>
                {jokeList.map((joke: DataJokesType, index) => {
                    if (joke.jokes.length === 0) return null;
                    return (
                        <JokeList
                            key={joke.id}
                            jokeId={joke.id}
                            jokeCategory={joke.name}
                            numberOfJokes={index + 1}
                            jokes={joke.jokes}
                            isOpened={joke.isOpen}
                        />
                    );
                })}
                <View style={{height: 20}} />
            </ScrollView>
        </View>
    );
}
