CREATE DATABASE `war_chest` ;


CREATE TABLE `war_chest`.`users` (
`username` VARCHAR( 50 ) NULL DEFAULT '',
`password` VARCHAR( 50 ) NULL ,
`user_id` INT NULL AUTO_INCREMENT PRIMARY KEY ,
UNIQUE (
`username`
)
) ENGINE = MYISAM ;


CREATE TABLE `war_chest`.`World` (
`Territory` INT NOT NULL AUTO_INCREMENT ,
PRIMARY KEY ( `Territory` )
) ENGINE = MYISAM ;

CREATE TABLE `war_chest`.`Territory` (
`Inhabitants` INT NOT NULL ,
`Resources` INT NOT NULL ,
`Ruler` TEXT NOT NULL ,
`Land Mass` INT NOT NULL ,
`Ownership` TEXT NOT NULL
) ENGINE = MYISAM ;


CREATE TABLE `war_chest`.`Tribe` (
`Tribe` TEXT NOT NULL ,
`Inhabitants` INT NOT NULL ,
`Weapons` INT NOT NULL ,
`Territories` INT NOT NULL ,
`Warriors` INT NOT NULL ,
`Food` INT NOT NULL ,
`Stone` INT NOT NULL ,
`Wood` INT NOT NULL 
) ENGINE = MYISAM ;


CREATE TABLE `war_chest`.`Ruler` (
`user_id` INT NOT NULL 
`Kingdom` VARCHAR( 50 ) NOT NULL ,
`Ruler Type` TEXT NOT NULL ,
`Attack Bonus` DECIMAL ( 10, 2 ) NOT NULL  ,
`Defense Bonus` DECIMAL ( 10, 2 ) NOT NULL  ,
`Trade Bonus` DECIMAL ( 10, 2 ) NOT NULL ,
`Resources Bonus` DECIMAL ( 10, 2 ) NOT NULL  ,
`Expansion Bonus` DECIMAL ( 10, 2 ) NOT NULL
) ENGINE = MYISAM ;


