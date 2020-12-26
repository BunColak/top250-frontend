export type Movie = {
    id: number;
    imdbRating: number;
    title: string;
    link: string;
    imdbId: string;
}

export type UserList = {
    id: string;
    movies: Movie[]
}
