-- Script de inicialización de base de datos MySQL para el proyecto de aeropuerto
-- Nota: La base de datos 'aeropuerto_db' ya se crea automáticamente por Docker Compose.
-- Este script crea el usuario, asigna permisos y crea las tablas.

CREATE USER 'aeropuerto_user'@'%' IDENTIFIED BY 'securepassword';
GRANT ALL PRIVILEGES ON aeropuerto_db.* TO 'aeropuerto_user'@'%';
FLUSH PRIVILEGES;

-- Nota: En Docker, el script init.sql se ejecuta automáticamente en la base de datos especificada en MYSQL_DATABASE (aeropuerto_db).

USE aeropuerto_db;

CREATE TABLE pasajeros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    apellido VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
