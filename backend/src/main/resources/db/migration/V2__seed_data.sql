INSERT INTO aerolineas (nombre, codigo_iata, pais, fecha_creacion, fecha_actualizacion) VALUES
('Avianca', 'AV', 'Colombia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('LATAM Colombia', 'LA', 'Colombia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Viva Air Colombia', 'VH', 'Colombia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Wingo', 'P5', 'Colombia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Satena', '9R', 'Colombia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Easyfly', 'EF', 'Colombia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Clic Air', 'VE', 'Colombia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('AerCaribe', 'JK', 'Colombia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SARPA', 'PA', 'Colombia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ADA', 'ZY', 'Colombia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SEARCA', 'SR', 'Colombia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Copa Airlines Colombia', 'CM', 'Colombia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO vuelos (codigo_vuelo, origen, destino, fecha_salida, fecha_llegada, estado, puerta, terminal, hora_abordaje, aerolinea_id, capacidad, fecha_creacion, fecha_actualizacion) VALUES
('FTK-101', 'Bogotá', 'Medellín', '2026-05-10 08:00:00', '2026-05-10 09:45:00', 'PROGRAMADO', 'B3', 'T1', '2026-05-10 07:30:00', 1, 180, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-102', 'Medellín', 'Cali', '2026-05-10 10:00:00', '2026-05-10 11:30:00', 'EN_VUELO', 'A1', 'T1', '2026-05-10 09:30:00', 2, 160, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-103', 'Cali', 'Barranquilla', '2026-05-10 12:15:00', '2026-05-10 14:45:00', 'RETRASADO', 'C2', 'T2', '2026-05-10 11:45:00', 3, 190, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-104', 'Barranquilla', 'Bogotá', '2026-05-10 15:30:00', '2026-05-10 17:30:00', 'ABORDANDO', 'D4', 'T2', '2026-05-10 15:00:00', 4, 200, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-105', 'Cartagena', 'Pereira', '2026-05-10 18:00:00', '2026-05-10 21:30:00', 'CANCELADO', 'A2', 'T3', '2026-05-10 17:15:00', 5, 170, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-106', 'Pereira', 'Bucaramanga', '2026-05-10 09:20:00', '2026-05-10 12:40:00', 'EN_VUELO', 'B1', 'T3', '2026-05-10 08:50:00', 6, 175, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-107', 'Bucaramanga', 'Santa Marta', '2026-05-10 13:00:00', '2026-05-10 15:20:00', 'PROGRAMADO', 'C5', 'T1', '2026-05-10 12:20:00', 7, 155, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-108', 'Santa Marta', 'Cúcuta', '2026-05-10 16:00:00', '2026-05-10 18:00:00', 'COMPLETADO', 'D1', 'T2', '2026-05-10 15:30:00', 8, 165, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-109', 'Cúcuta', 'Ibagué', '2026-05-10 19:00:00', '2026-05-10 21:10:00', 'RETRASADO', 'A4', 'T1', '2026-05-10 18:30:00', 9, 145, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-110', 'Ibagué', 'Villavicencio', '2026-05-10 22:00:00', '2026-05-11 00:15:00', 'PROGRAMADO', 'B7', 'T3', '2026-05-10 21:20:00', 10, 150, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-111', 'Bogotá', 'Cartagena', '2026-05-11 06:00:00', '2026-05-11 08:30:00', 'PROGRAMADO', 'A3', 'T1', '2026-05-11 05:30:00', 11, 185, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-112', 'Medellín', 'Barranquilla', '2026-05-11 09:00:00', '2026-05-11 11:45:00', 'EN_VUELO', 'B2', 'T2', '2026-05-11 08:30:00', 12, 170, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-113', 'Cali', 'Pereira', '2026-05-11 12:00:00', '2026-05-11 13:30:00', 'RETRASADO', 'C1', 'T3', '2026-05-11 11:30:00', 1, 160, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-114', 'Barranquilla', 'Santa Marta', '2026-05-11 14:00:00', '2026-05-11 15:30:00', 'ABORDANDO', 'D3', 'T1', '2026-05-11 13:30:00', 2, 155, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-115', 'Cartagena', 'Cúcuta', '2026-05-11 16:00:00', '2026-05-11 18:45:00', 'CANCELADO', 'A5', 'T2', '2026-05-11 15:15:00', 3, 175, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-116', 'Pereira', 'Ibagué', '2026-05-11 19:00:00', '2026-05-11 20:30:00', 'EN_VUELO', 'B4', 'T3', '2026-05-11 18:30:00', 4, 165, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-117', 'Bucaramanga', 'Villavicencio', '2026-05-11 21:00:00', '2026-05-11 23:15:00', 'PROGRAMADO', 'C3', 'T1', '2026-05-11 20:20:00', 5, 150, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-118', 'Santa Marta', 'Bogotá', '2026-05-12 07:00:00', '2026-05-12 09:30:00', 'COMPLETADO', 'D2', 'T2', '2026-05-12 06:30:00', 6, 180, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-119', 'Cúcuta', 'Medellín', '2026-05-12 10:00:00', '2026-05-12 12:45:00', 'RETRASADO', 'A1', 'T3', '2026-05-12 09:30:00', 7, 170, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FTK-120', 'Ibagué', 'Cartagena', '2026-05-12 13:00:00', '2026-05-12 16:30:00', 'PROGRAMADO', 'B5', 'T1', '2026-05-12 12:20:00', 8, 160, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO pasajeros (nombre, apellido, email, telefono, numero_pasaporte, vuelo_id, fecha_creacion, fecha_actualizacion) VALUES
('Juan', 'Pérez', 'juan.perez@email.com', '+573001234567', '12345678', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('María', 'García', 'maria.garcia@email.com', '+573019876543', '87654321', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Carlos', 'Rodríguez', 'carlos.rodriguez@email.com', '+573025551234', '11223344', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO equipajes (codigo_equipaje, pasajero_id, vuelo_id, peso, descripcion, estado, fecha_creacion, fecha_actualizacion) VALUES
('ABC123', 1, 1, 23.50, 'Maleta negra con ruedas, marca Samsonite', 'PERDIDO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('DEF456', 2, 2, 8.20, 'Bolso de mano azul con laptop', 'ENTREGADO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('GHI789', 3, 3, 18.70, 'Maleta roja mediana con zapatos y accesorios', 'ENTREGADO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO notificaciones (titulo, mensaje, pasajero_id, tipo, estado, fecha_creacion, fecha_actualizacion) VALUES
('Vuelo retrasado', 'Su vuelo ha sido retrasado 45 minutos.', 1, 'VUELO_RETRASADO', 'PENDIENTE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Equipaje entregado', 'Su equipaje ha sido entregado en la cinta 4.', 2, 'EQUIPAJE_ENTREGADO', 'ENVIADA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
