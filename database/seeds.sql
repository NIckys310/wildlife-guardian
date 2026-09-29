-- Insertar cámaras iniciales en la reserva
INSERT INTO cameras (code, sector, location, battery_level, status) VALUES
('CAM-001', 'Sector Norte (Ribera)', ST_GeomFromText('POINT(-76.8123 3.2109)', 4326), 92, 'ACTIVE'),
('CAM-002', 'Sector Páramo Alto', ST_GeomFromText('POINT(-76.8542 3.2541)', 4326), 85, 'ACTIVE'),
('CAM-003', 'Sector Sur (Valle Seco)', ST_GeomFromText('POINT(-76.7901 3.1892)', 4326), 78, 'ACTIVE');

-- Insertar especies protegidas
INSERT INTO species (scientific_name, common_name, category, conservation_status, description) VALUES
('Panthera onca', 'Jaguar', 'Felinos', 'Casi amenazado', 'Felino de gran tamaño monitoreado en zonas húmedas.'),
('Tremarctos ornatus', 'Oso de Anteojos', 'Mamíferos', 'Vulnerable', 'Único oso nativo de Sudamérica, habita en zonas de páramo.'),
('Vultur gryphus', 'Cóndor Andino', 'Aves', 'En peligro', 'Ave emblemática de gran envergadura en cumbres andinas.'),
('Odocoileus virginianus', 'Venado de Cola Blanca', 'Cérvidos', 'Preocupación menor', 'Habitante frecuente de valles secos.');