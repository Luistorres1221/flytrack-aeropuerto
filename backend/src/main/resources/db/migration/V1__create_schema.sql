CREATE TABLE aerolineas (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    codigo_iata VARCHAR(3) NOT NULL UNIQUE,
    pais VARCHAR(100) NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vuelos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    codigo_vuelo VARCHAR(10) NOT NULL UNIQUE,
    origen VARCHAR(100) NOT NULL,
    destino VARCHAR(100) NOT NULL,
    fecha_salida TIMESTAMP NOT NULL,
    fecha_llegada TIMESTAMP NOT NULL,
    estado VARCHAR(50) NOT NULL,
    puerta VARCHAR(10) NOT NULL,
    terminal VARCHAR(20) NOT NULL,
    hora_abordaje TIMESTAMP NOT NULL,
    aerolinea_id BIGINT NOT NULL,
    capacidad INT NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_vuelo_aerolinea FOREIGN KEY (aerolinea_id) REFERENCES aerolineas(id)
);

CREATE TABLE pasajeros (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefono VARCHAR(20) NOT NULL,
    numero_pasaporte VARCHAR(20) NOT NULL UNIQUE,
    vuelo_id BIGINT NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pasajero_vuelo FOREIGN KEY (vuelo_id) REFERENCES vuelos(id)
);

CREATE TABLE equipajes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    codigo_equipaje VARCHAR(20) NOT NULL UNIQUE,
    pasajero_id BIGINT NOT NULL,
    vuelo_id BIGINT NOT NULL,
    peso DECIMAL(5,2) NOT NULL,
    descripcion VARCHAR(500),
    estado VARCHAR(50) NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_equipaje_pasajero FOREIGN KEY (pasajero_id) REFERENCES pasajeros(id),
    CONSTRAINT fk_equipaje_vuelo FOREIGN KEY (vuelo_id) REFERENCES vuelos(id)
);

CREATE TABLE notificaciones (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(200) NOT NULL,
    mensaje VARCHAR(1000) NOT NULL,
    pasajero_id BIGINT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notificacion_pasajero FOREIGN KEY (pasajero_id) REFERENCES pasajeros(id)
);
