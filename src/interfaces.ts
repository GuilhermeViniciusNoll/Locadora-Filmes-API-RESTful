import { QueryResult } from "pg"

interface Movie {
    id: number,
    name: string,
    category: string,
    duration: number,
    price: number
}

type MovieNoId = Omit<Movie, "id">
type MovieReturn = QueryResult<Movie>

export { Movie, MovieReturn, MovieNoId }