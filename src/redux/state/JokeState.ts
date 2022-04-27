import {
    DataJokesType,
    JokeType,
    ListDataJokesType,
} from "../../util/type/JokesType";
import {createAction, createReducer} from "@reduxjs/toolkit";
import {RootState} from "../index";

type addNewJokeItemType = {
    id: number;
    joke: JokeType;
};
type moveJokeToTopType = {
    id: number;
};
const initialState: ListDataJokesType = {
    data: [],
};

export const getJokeList = (state: RootState) => state.jokeList.data;

export const setJokes = createAction("SET_JOKE", (data: DataJokesType[]) => ({
    payload: data,
}));

export const addNewJokeToJokeList = createAction(
    "ADD_NEW_JOKE_TO_JOKE_LIST",
    (data: addNewJokeItemType) => ({
        payload: data,
    }),
);

export const moveJokeToTop = createAction(
    "MOVE_JOKE_TO_TOP",
    (data: moveJokeToTopType) => ({
        payload: data,
    }),
);
export const setJokeOpen = createAction(
    "SET_JOKE_OPEN",
    (data: {id: number; open: boolean}) => ({
        payload: data,
    }),
);

export const resetJokeList = createAction("RESET_JOKE_LIST");

const JokeReducer = createReducer(initialState, builder => {
    builder
        .addCase(setJokes, (state, action) => {
            // @ts-ignore
            state.data = action.payload;
        })
        .addCase(addNewJokeToJokeList, (state, action) => {
            const jokeList = [...state.data];
            const idJokeLis = action.payload.id;
            //find id in list
            // @ts-ignore
            const index = jokeList.findIndex((item: JokeType) => {
                return item.id === idJokeLis;
            });
            if (index !== -1) {
                // @ts-ignore
                jokeList[index] = action.payload.joke;
            }
            state.data = jokeList;
        })
        .addCase(resetJokeList, () => {
            return initialState;
        })
        .addCase(moveJokeToTop, (state, action) => {
            const jokeList = [...state.data];
            const idJokeLis = action.payload.id;
            //find id in list
            // @ts-ignore
            const index = jokeList.findIndex(function (item: JokeType) {
                return item.id === idJokeLis;
            });
            console.log(index, idJokeLis);
            if (index !== -1) {
                jokeList.unshift(jokeList.splice(index, 1)[0]);
            }
            state.data = jokeList;
        })
        .addCase(setJokeOpen, (state, action) => {
            const jokeList = [...state.data];
            const idJokeLis = action.payload.id;
            //find id in list
            // @ts-ignore
            const indexFind = jokeList.findIndex(function (item: JokeType) {
                return item.id === idJokeLis;
            });
            // @ts-ignore
            jokeList.map(function (item: JokeType, index) {
                if (index == indexFind) {
                    jokeList[index].isOpen = action.payload.open;
                } else {
                    jokeList[index].isOpen = false;
                }
            });
            state.data = jokeList;
        });
});

export default JokeReducer;
