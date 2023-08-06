import { Request, Response } from "express"
import { Movie, MovieNoId, MovieReturn } from "./interfaces"
import { client } from "./database"
import { QueryConfig } from "pg"
import format from "pg-format"

const createMovie = async (req: Request, res: Response): Promise<Response> => {
    const body: MovieNoId = req.body
    const queryString: string = `
    INSERT INTO "movies" ("name", "category", "duration", "price")
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `
    const queryConfig: QueryConfig = {
        text: queryString,
        values: Object.values(body)
    }
    const result: MovieReturn = await client.query(queryConfig)
    const movie: Movie = result.rows[0]
    return res.status(201).json(movie)
}

const listMovies = async (req: Request, res: Response): Promise<Response> => {
    if (req.query.category) {
        const queryConfig: QueryConfig = {
            text: `SELECT * FROM "movies" WHERE category = $1;`,
            values: [req.query.category]
        }
        const result: MovieReturn = await client.query(queryConfig);
        if (result.rowCount === 0) {
            const result: MovieReturn = await client.query(`SELECT * FROM "movies";`)
            return res.status(200).json(result.rows)
        }
        return res.status(200).json(result.rows)
    }
    const result: MovieReturn = await client.query(`SELECT * FROM "movies";`)
    return res.status(200).json(result.rows)
}

const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
    const queryConfig: QueryConfig = {
        text: `DELETE FROM movies WHERE id = $1;`,
        values: [req.params.id]
    }
    await client.query(queryConfig)
    return res.status(204).json()
}

const updateMovie = async (req: Request, res: Response): Promise<Response> => {
    const queryConfig: QueryConfig = {
        text: format(`UPDATE movies SET(%I) = ROW(%L) WHERE id = $1 RETURNING *;`, Object.keys(req.body), Object.values(req.body)),
        values: [req.params.id]
    }
    const result: MovieReturn = await client.query(queryConfig)
    return res.status(200).json(result.rows[0])
}

const movieById = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json(res.locals)
}

export { createMovie, listMovies, movieById, deleteMovie, updateMovie }