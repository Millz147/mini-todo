CREATE TABLE todos
(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    isFinished BOOLEAN NOT NULL
);