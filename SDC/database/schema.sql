DROP DATABASE IF EXISTS photogallery;

CREATE DATABASE photogallery;

\c "photogallery";

CREATE TABLE listings(
  listing_id SERIAL PRIMARY KEY,
  title TEXT,
  hostname TEXT,
  address TEXT,
  city TEXT,
  state TEXT
);

CREATE TABLE photos(
  photo_id SERIAL PRIMARY KEY,
  description TEXT,
  url TEXT,
  resolution TEXT,
  listing_id INTEGER REFERENCES listings(listing_id)
);

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  username TEXT
);

CREATE TABLE liked_photos(
  liked_photo_id SERIAL PRIMARY KEY,
  photo_id INTEGER REFERENCES photos(photo_id),
  user_id INTEGER REFERENCES users(user_id)
);
