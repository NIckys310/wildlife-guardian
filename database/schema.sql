CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE cameras (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    sector VARCHAR(100) NOT NULL,
    location GEOMETRY(Point, 4326) NOT NULL,
    battery_level INT CHECK (battery_level BETWEEN 0 AND 100),
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE species (
    id SERIAL PRIMARY KEY,
    scientific_name VARCHAR(100) NOT NULL,
    common_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    conservation_status VARCHAR(50),
    description TEXT
);

CREATE TABLE detections (
    id SERIAL PRIMARY KEY,
    camera_id INT REFERENCES cameras(id) ON DELETE CASCADE,
    species_id INT REFERENCES species(id) ON DELETE SET NULL,
    confidence DECIMAL(5,2) NOT NULL,
    media_url TEXT NOT NULL,
    detection_type VARCHAR(30) NOT NULL,
    speed_estimated VARCHAR(50),
    behavior_notes TEXT,
    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE security_alerts (
    id SERIAL PRIMARY KEY,
    camera_id INT REFERENCES cameras(id) ON DELETE CASCADE,
    threat_level VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'PENDING',
    coordinates GEOMETRY(Point, 4326),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);