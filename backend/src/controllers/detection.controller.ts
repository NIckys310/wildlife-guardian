import { Request, Response } from 'express';
import { pool } from '../config/db';

export const getDetections = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query(`
            SELECT d.id, d.confidence, d.media_url, d.detection_type, d.detected_at, 
                   s.common_name AS species_name, c.sector 
            FROM detections d
            LEFT JOIN species s ON d.species_id = s.id
            LEFT JOIN cameras c ON d.camera_id = c.id
            ORDER BY d.detected_at DESC LIMIT 50
        `);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor al obtener detecciones' });
    }
};

export const createDetection = async (req: Request, res: Response): Promise<void> => {
    const { camera_id, species_id, confidence, media_url, detection_type, speed_estimated, behavior_notes } = req.body;
    try {
        const query = `
            INSERT INTO detections (camera_id, species_id, confidence, media_url, detection_type, speed_estimated, behavior_notes)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
        `;
        const values = [camera_id, species_id, confidence, media_url, detection_type, speed_estimated, behavior_notes];
        const newDetection = await pool.query(query, values);
        res.status(201).json(newDetection.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar la detección de IA' });
    }
};