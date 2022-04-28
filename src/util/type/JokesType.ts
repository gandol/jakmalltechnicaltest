export type JokeType = {
    id: number;
    joke: string;
};

export type DataJokesType = {
    id: number;
    name: string;
    isOpen: boolean;
    jokes: JokeType[];
};

export type ListDataJokesType = {
    data: DataJokesType[];
};
