import { Request, Response } from 'express';
import { pool } from '../config/db';

export const getSecurityAlerts = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query(`
            SELECT a.id, a.threat_level, a.description, a.status, a.created_at, c.sector 
            FROM security_alerts a
            LEFT JOIN cameras c ON a.camera_id = c.id
            WHERE a.status = 'PENDING'
            ORDER BY a.created_at DESC;
        `);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener alertas de seguridad' });
    }
};

export const createSecurityAlert = async (req: Request, res: Response): Promise<void> => {
    const { camera_id, threat_level, description, latitude, longitude } = req.body;
    try {
        const query = `
            INSERT INTO security_alerts (camera_id, threat_level, description, coordinates, status)
            VALUES ($1, $2, $3, ST_GeomFromText($4, 4326), 'PENDING') RETURNING *;
        `;
        const pointText = `POINT(${longitude} ${latitude})`;
        const values = [camera_id, threat_level, description, pointText];
        const newAlert = await pool.query(query, values);
        res.status(201).json(newAlert.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al emitir alerta de intrusión' });
    }
};