INSERT INTO vuelos (codigo_vuelo, origen, destino, fecha_salida, fecha_llegada, estado, puerta, terminal, hora_abordaje, aerolinea, capacidad, fecha_creacion, fecha_actualizacion) VALUES
('FTK-101', 'Bogotá', 'Medellín', '2026-05-10 08:00:00', '2026-05-10 09:45:00', 'PROGRAMADO', 'B3', 'T1', '2026-05-10 07:30:00', 'Avianca', 180, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-102', 'Medellín', 'Cali', '2026-05-10 10:00:00', '2026-05-10 11:30:00', 'EN_VUELO', 'A1', 'T1', '2026-05-10 09:30:00', 'LATAM Colombia', 160, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-103', 'Cali', 'Barranquilla', '2026-05-10 12:15:00', '2026-05-10 14:45:00', 'RETRASADO', 'C2', 'T2', '2026-05-10 11:45:00', 'Copa Airlines Colombia', 190, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-104', 'Barranquilla', 'Bogotá', '2026-05-10 15:30:00', '2026-05-10 17:30:00', 'ABORDANDO', 'D4', 'T2', '2026-05-10 15:00:00', 'Wingo', 200, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-105', 'Cartagena', 'Pereira', '2026-05-10 18:00:00', '2026-05-10 21:30:00', 'CANCELADO', 'A2', 'T3', '2026-05-10 17:15:00', 'Clic Air', 170, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-106', 'Pereira', 'Bucaramanga', '2026-05-10 09:20:00', '2026-05-10 12:40:00', 'EN_VUELO', 'B1', 'T3', '2026-05-10 08:50:00', 'Satena', 175, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-107', 'Bucaramanga', 'Santa Marta', '2026-05-10 13:00:00', '2026-05-10 15:20:00', 'PROGRAMADO', 'C5', 'T1', '2026-05-10 12:20:00', 'Easyfly', 155, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-108', 'Santa Marta', 'Cúcuta', '2026-05-10 16:00:00', '2026-05-10 18:00:00', 'COMPLETADO', 'D1', 'T2', '2026-05-10 15:30:00', 'Viva Air Colombia', 165, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-109', 'Cúcuta', 'Ibagué', '2026-05-10 19:00:00', '2026-05-10 21:10:00', 'RETRASADO', 'A4', 'T1', '2026-05-10 18:30:00', 'AerCaribe', 145, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-110', 'Ibagué', 'Villavicencio', '2026-05-10 22:00:00', '2026-05-11 00:15:00', 'PROGRAMADO', 'B7', 'T3', '2026-05-10 21:20:00', 'SARPA', 150, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-111', 'Bogotá', 'Cartagena', '2026-05-11 06:00:00', '2026-05-11 08:30:00', 'PROGRAMADO', 'A3', 'T1', '2026-05-11 05:30:00', 'ADA', 185, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-112', 'Medellín', 'Barranquilla', '2026-05-11 09:00:00', '2026-05-11 11:45:00', 'EN_VUELO', 'B2', 'T2', '2026-05-11 08:30:00', 'SEARCA', 170, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-113', 'Cali', 'Pereira', '2026-05-11 12:00:00', '2026-05-11 13:30:00', 'RETRASADO', 'C1', 'T3', '2026-05-11 11:30:00', 'Avianca', 160, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-114', 'Barranquilla', 'Santa Marta', '2026-05-11 14:00:00', '2026-05-11 15:30:00', 'ABORDANDO', 'D3', 'T1', '2026-05-11 13:30:00', 'LATAM Colombia', 155, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-115', 'Cartagena', 'Cúcuta', '2026-05-11 16:00:00', '2026-05-11 18:45:00', 'CANCELADO', 'A5', 'T2', '2026-05-11 15:15:00', 'Copa Airlines Colombia', 175, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-116', 'Pereira', 'Ibagué', '2026-05-11 19:00:00', '2026-05-11 20:30:00', 'EN_VUELO', 'B4', 'T3', '2026-05-11 18:30:00', 'Wingo', 165, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-117', 'Bucaramanga', 'Villavicencio', '2026-05-11 21:00:00', '2026-05-11 23:15:00', 'PROGRAMADO', 'C3', 'T1', '2026-05-11 20:20:00', 'Clic Air', 150, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-118', 'Santa Marta', 'Bogotá', '2026-05-12 07:00:00', '2026-05-12 09:30:00', 'COMPLETADO', 'D2', 'T2', '2026-05-12 06:30:00', 'Satena', 180, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-119', 'Cúcuta', 'Medellín', '2026-05-12 10:00:00', '2026-05-12 12:45:00', 'RETRASADO', 'A1', 'T3', '2026-05-12 09:30:00', 'Easyfly', 170, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-120', 'Ibagué', 'Cartagena', '2026-05-12 13:00:00', '2026-05-12 16:30:00', 'PROGRAMADO', 'B5', 'T1', '2026-05-12 12:20:00', 'Viva Air Colombia', 160, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Datos de pasajeros de prueba
INSERT INTO pasajeros (documento, nombre, apellido, telefono, email, fecha_nacimiento, fecha_creacion, fecha_actualizacion) VALUES
('12345678', 'Juan', 'Pérez', '+57 300 123 4567', 'juan.perez@email.com', '1990-05-15', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('87654321', 'María', 'García', '+57 301 987 6543', 'maria.garcia@email.com', '1985-08-22', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('11223344', 'Carlos', 'Rodríguez', '+57 302 555 1234', 'carlos.rodriguez@email.com', '1992-12-10', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Datos de equipaje de prueba
INSERT INTO equipajes (numero_etiqueta, descripcion, estado, vuelo_id, pasajero_id, fecha_creacion, fecha_actualizacion) VALUES
('ABC123', 'Maleta negra con ruedas, marca Samsonite, contiene ropa y documentos', 'PERDIDO', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('DEF456', 'Bolso de mano azul, contiene laptop y accesorios electrónicos', 'ENCONTRADO', 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('GHI789', 'Maleta roja mediana, marca TravelPro, contiene zapatos y accesorios', 'ENTREGADO', 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('JKL012', 'Mochila deportiva negra, contiene artículos deportivos', 'PERDIDO', 4, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('MNO345', 'Maleta rígida plateada, contiene productos electrónicos', 'ENCONTRADO', 5, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
