-- Script de inicialización de base de datos MySQL para el proyecto de aeropuerto
-- Nota: La base de datos 'aeropuerto_db' ya se crea automáticamente por Docker Compose.
-- Este script crea el usuario, asigna permisos y crea las tablas.

CREATE USER 'aeropuerto_user'@'%' IDENTIFIED BY 'securepassword';
GRANT ALL PRIVILEGES ON aeropuerto_db.* TO 'aeropuerto_user'@'%';
FLUSH PRIVILEGES;

-- Nota: En Docker, el script init.sql se ejecuta automáticamente en la base de datos especificada en MYSQL_DATABASE (aeropuerto_db).

USE aeropuerto_db;

CREATE TABLE pasajeros (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    numero_pasaporte VARCHAR(20) UNIQUE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE vuelos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    codigo_vuelo VARCHAR(10) UNIQUE NOT NULL,
    origen VARCHAR(100) NOT NULL,
    destino VARCHAR(100) NOT NULL,
    fecha_salida TIMESTAMP NOT NULL,
    fecha_llegada TIMESTAMP NOT NULL,
    estado ENUM('PROGRAMADO', 'EN_VUELO', 'RETRASADO', 'CANCELADO', 'COMPLETADO') NOT NULL,
    capacidad INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE equipajes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    codigo_equipaje VARCHAR(20) UNIQUE NOT NULL,
    pasajero_id BIGINT NOT NULL,
    vuelo_id BIGINT NOT NULL,
    peso DECIMAL(5,2) NOT NULL,
    descripcion TEXT,
    estado ENUM('REGISTRADO', 'EN_TRANSITO', 'ENTREGADO', 'PERDIDO', 'RETRASADO') NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pasajero_id) REFERENCES pasajeros(id),
    FOREIGN KEY (vuelo_id) REFERENCES vuelos(id)
);

CREATE TABLE notificaciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    mensaje TEXT NOT NULL,
    pasajero_id BIGINT NOT NULL,
    tipo ENUM('VUELO_RETRASADO', 'EQUIPAJE_ENTREGADO', 'EQUIPAJE_PERDIDO', 'CHECK_IN_DISPONIBLE', 'EMBARQUE_INICIADO') NOT NULL,
    estado ENUM('PENDIENTE', 'ENVIADA', 'LEIDA') NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pasajero_id) REFERENCES pasajeros(id)
);
