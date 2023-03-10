export type MovieResponse = {
    movie_id: number | undefined;
    name: string | undefined;
    desc: string | undefined;
    length: string | undefined;
    rating: string | undefined;
    thumbnail: string | undefined;
    trailer: string | undefined;
}

export type TheaterResponse = {
    _id: string | undefined;
    name: string | undefined;
    address: string | undefined;
    zip: string | undefined;
    description: string | undefined;
    image: string | undefined;
    movies: number[] | undefined;
}

export type ConcessionResponse = {
    _id: string | undefined;
    name: string | undefined;
    type: string | undefined;
    price: number | undefined;
    image: string | undefined;
}

export type updateTheaterIdFunc  = (theaterId: string) => void;
export type TheaterRequest = {
    theaterId?: string;
    name?: string;
    address?: string;
    zip?: string;
    description?: string;
    theaterImage?: string;
    movies?: number[];
}

export interface theaterRevResponse {
    [key: string]: Array<object> | number
}