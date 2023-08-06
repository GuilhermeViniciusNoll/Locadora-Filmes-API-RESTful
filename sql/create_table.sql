CREATE TABLE IF NOT EXISTS "movies" (
    "id" serial PRIMARY KEY NOT NULL UNIQUE, 
    "name" VARCHAR (50) NOT NULL,
    "category" VARCHAR(50) NOT NULL, 
    "duration" INT NOT NULL, 
    "price" INT NOT NULL
);