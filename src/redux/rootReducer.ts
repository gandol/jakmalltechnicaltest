import {combineReducers} from "@reduxjs/toolkit";
import JokeReducer from "./state/JokeState";

const rootReducer = combineReducers({
    jokeList: JokeReducer,
});

export default rootReducer;
