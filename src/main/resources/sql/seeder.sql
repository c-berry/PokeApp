CREATE DATABASE IF NOT EXISTS pokemon_db;

USE pokemon_db;

INSERT INTO pokemon (api_id, name, weight, height, official_art, sprite, sprite_shiny)
VALUES (6, 'charizard', 905, 17, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/6.png');

INSERT INTO type (name)
VALUES ('normal'),
       ('fire'),
       ('water'),
       ('grass'),
       ('electric'),
       ('ice'),
       ('fighting'),
       ('poison'),
       ('ground'),
       ('flying'),
       ('psychic'),
       ('bug'),
       ('rock'),
       ('ghost'),
       ('dark'),
       ('dragon'),
       ('steel'),
       ('fairy');

INSERT INTO ability (name)
VALUES ('blaze'),
       ('solar-power');

INSERT INTO users (email, username, password)
VALUES ('user@email.com', 'user', 'password');

INSERT INTO pokemon_type (pokemon_id, type_id)
VALUES (1, 2),
       (1, 10);

INSERT INTO pokemon_ability (pokemon_id, ability_id)
VALUES (1, 1),
       (1, 2);

INSERT INTO user_pokemon (user_id, pokemon_id)
VALUES (1, 1);
