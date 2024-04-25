CREATE TABLE IF NOT EXISTS `billett` (
    `id` INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `film` VARCHAR(50) NOT NULL,
    `antall` INTEGER NOT NULL,
    `fornavn` VARCHAR(50) NOT NULL,
    `etternavn` VARCHAR(50) NOT NULL,
    `telefonnr` VARCHAR(50) NOT NULL,
    `epost` VARCHAR(50) NOT NULL
    );
INSERT INTO billett (film, antall, fornavn, etternavn, telefonnr, epost)
VALUES ('Titanic 2', 1, 'Sack', 'Znyder', '12345678', 'hello@watermovies.com');