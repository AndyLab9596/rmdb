import { Movies } from "./types";

export const basicFetch = async <returnType>(endPoint: string): Promise<returnType> => {
    const response = await fetch(endPoint);
    if (!response.ok) throw new Error("Error!");
    const data = await response.json();
    return data;
}

// Fetch functions
export const fetchMovies = async (search = "", page = 1): Promise<Movies> => {
    return await basicFetch<Movies>(`/api/movies?search=${search}&page=${page}`)
}