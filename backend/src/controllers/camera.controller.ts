
import { Request, Response } from 'express';
import { pool } from '../config/db';

export const getCameras = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT id, code, sector, battery_level, status FROM cameras ORDER BY id ASC;');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el estado de las cámaras' });
    }
};

export const registerCamera = async (req: Request, res: Response): Promise<void> => {
    const { code, sector, latitude, longitude, battery_level } = req.body;
    try {
        const query = `
            INSERT INTO cameras (code, sector, location, battery_level, status)
            VALUES ($1, $2, ST_GeomFromText($3, 4326), $4, 'ACTIVE') RETURNING *;
        `;
        const pointText = `POINT(${longitude} ${latitude})`;
        const values = [code, sector, pointText, battery_level || 100];
        const newCamera = await pool.query(query, values);
        res.status(201).json(newCamera.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar nueva cámara en la red' });
    }
};