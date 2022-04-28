import Axios from "axios";

const ApiCall = Axios.create({
    baseURL: "https://v2.jokeapi.dev/",
});

export default ApiCall;
