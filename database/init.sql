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
    estado ENUM('PROGRAMADO', 'EN_VUELO', 'ABORDANDO', 'RETRASADO', 'CANCELADO', 'COMPLETADO') NOT NULL,
    puerta VARCHAR(10) NOT NULL,
    terminal VARCHAR(20) NOT NULL,
    hora_abordaje TIMESTAMP NOT NULL,
    capacidad INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO vuelos (codigo_vuelo, origen, destino, fecha_salida, fecha_llegada, estado, puerta, terminal, hora_abordaje, capacidad, fecha_creacion, fecha_actualizacion) VALUES
('FTK101', 'Bogotá', 'Medellín', '2026-05-10 08:00:00', '2026-05-10 09:45:00', 'PROGRAMADO', 'B3', 'T1', '2026-05-10 07:30:00', 180, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK102', 'Medellín', 'Cali', '2026-05-10 10:00:00', '2026-05-10 11:30:00', 'EN_VUELO', 'A1', 'T1', '2026-05-10 09:30:00', 160, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK103', 'Cali', 'Barranquilla', '2026-05-10 12:15:00', '2026-05-10 14:45:00', 'RETRASADO', 'C2', 'T2', '2026-05-10 11:45:00', 190, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK104', 'Barranquilla', 'Bogotá', '2026-05-10 15:30:00', '2026-05-10 17:30:00', 'ABORDANDO', 'D4', 'T2', '2026-05-10 15:00:00', 200, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK105', 'Cartagena', 'Pereira', '2026-05-10 18:00:00', '2026-05-10 21:30:00', 'CANCELADO', 'A2', 'T3', '2026-05-10 17:15:00', 170, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK106', 'Pereira', 'Bucaramanga', '2026-05-10 09:20:00', '2026-05-10 12:40:00', 'EN_VUELO', 'B1', 'T3', '2026-05-10 08:50:00', 175, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK107', 'Bucaramanga', 'Santa Marta', '2026-05-10 13:00:00', '2026-05-10 15:20:00', 'PROGRAMADO', 'C5', 'T1', '2026-05-10 12:20:00', 155, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK108', 'Santa Marta', 'Cúcuta', '2026-05-10 16:00:00', '2026-05-10 18:00:00', 'COMPLETADO', 'D1', 'T2', '2026-05-10 15:30:00', 165, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK109', 'Cúcuta', 'Ibagué', '2026-05-10 19:00:00', '2026-05-10 21:10:00', 'RETRASADO', 'A4', 'T1', '2026-05-10 18:30:00', 145, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK110', 'Ibagué', 'Villavicencio', '2026-05-10 22:00:00', '2026-05-11 00:15:00', 'PROGRAMADO', 'B7', 'T3', '2026-05-10 21:20:00', 150, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

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
