import { Router } from 'express';
import { getDetections, createDetection } from '../controllers/detection.controller';
import { getCameras, registerCamera } from '../controllers/camera.controller';
import { getSecurityAlerts, createSecurityAlert } from '../controllers/alert.controller';

const router = Router();

// Endpoints de Detecciones de IA
router.get('/detections', getDetections);
router.post('/detections', createDetection);

// Endpoints de Red de Cámaras
router.get('/cameras', getCameras);
router.post('/cameras', registerCamera);

// Endpoints de Alertas Anti-Furtivos
router.get('/alerts', getSecurityAlerts);
router.post('/alerts', createSecurityAlert);

export default router;