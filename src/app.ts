import express, { Application, json } from "express"
import { startDB } from "./database"
import { createMovie, deleteMovie, listMovies, movieById, updateMovie } from "./logics"
import middleware from "./middlewares"

const app: Application = express()
app.use(json())

app.post(`/movies`, middleware.nameExist, createMovie)
app.get(`/movies`, listMovies)
app.get(`/movies/:id`, middleware.idExist, movieById)
app.delete(`/movies/:id`, middleware.idExist, deleteMovie)
app.patch(`/movies/:id`, middleware.idExist, middleware.nameExist, updateMovie)

const port: number = 3000
app.listen(3000, async () => {
    await startDB()
    console.log(`Server is Running at http://localhost:${port}`)
})