create TABLE item(
    id SERIAL PRIMARY KEY,
    date DATE,
    title VARCHAR(255),
    amount INTEGER,
    distance REAL
)