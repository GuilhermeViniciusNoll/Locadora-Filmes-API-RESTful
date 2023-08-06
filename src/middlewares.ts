import { Movie, MovieReturn } from "./interfaces"
import { client } from "./database"
import { NextFunction, Request, Response, query } from "express"
import { QueryConfig } from "pg"

const nameExist = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const text: string = `SELECT * FROM movies WHERE name = $1`
    const queryConfig: QueryConfig = {
        text: text,
        values: [req.body.name]
    }
    const result: MovieReturn = await client.query(queryConfig)
    const movie: Movie = result.rows[0]
    if (movie) return res.status(409).json({ message: "Movie name already exists!" })
    return next()
}

const idExist = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const text: string = `SELECT * FROM movies WHERE id = $1`
    const queryConfig: QueryConfig = {
        text: text,
        values: [req.params.id]
    }
    const result: MovieReturn = await client.query(queryConfig)
    const movie: Movie = result.rows[0]
    if (!movie) return res.status(404).json({ message: "Movie not found!" })
    res.locals = movie
    return next()
}

export default { nameExist, idExist }