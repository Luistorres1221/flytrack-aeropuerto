-- Script de inicialización de MySQL para creación de base de datos y usuario.
-- El esquema y los datos se gestionan con Flyway desde el backend.

CREATE DATABASE IF NOT EXISTS aeropuerto_db;

CREATE USER IF NOT EXISTS 'aeropuerto_user'@'%' IDENTIFIED BY 'securepassword';
GRANT ALL PRIVILEGES ON aeropuerto_db.* TO 'aeropuerto_user'@'%';
FLUSH PRIVILEGES;
