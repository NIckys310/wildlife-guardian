import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Registrar rutas de la API
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('AI Wildlife Guardian Backend en ejecución operativa - 2026');
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en el puerto ${PORT}`);
});