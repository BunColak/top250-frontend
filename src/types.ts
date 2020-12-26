export type IMovie = {
    id: number;
    imdbRating: number;
    title: string;
    link: string;
    imdbId: string;
    watched: boolean;
}

export type IUserList = {
    id: string;
    movies: IMovie[]
}
