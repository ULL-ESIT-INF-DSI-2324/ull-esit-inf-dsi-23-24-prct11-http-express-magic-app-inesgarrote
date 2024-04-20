import express from 'express';
import { ManejadorCartas } from './manejador_carta.js';
import { JSONaCarta } from './carta.js';

const manejadorCarta = ManejadorCartas.getInstance();
const app = express();
app.use(express.json());

app.get('/cards', (req, res) => {
    const { user, id } = req.query;
    if (!user) return res.send({ status: 'Error', answer: 'Un usuario debe ser proporcionado' });
    if (id) {
        manejadorCarta.mostrarCarta(user as string, parseInt(id as string), (error, result) => {
            res.send({ status: error ? 'Error' : 'Éxito', answer: error || result });
        });
    } else {
        manejadorCarta.listarCartas(user as string, (error, result) => {
            res.send({ status: error ? 'Error' : 'Éxito', answer: error || result });
        });
    }
    return; 
});

app.post('/cards', (req, res) => {
    const { user } = req.query;
    if (!user) return res.send({ status: 'Error', answer: 'Un usuario debe ser proporcionado' });
    manejadorCarta.agregarCarta(user as string, JSONaCarta(req.body), (error, result) => {
        res.send({ status: error ? 'Error' : 'Éxito', answer: error || result });
    });
    return;
});

app.delete('/cards', (req, res) => {
    const { user, id } = req.query;
    if (!user) return res.send({ status: 'Error', answer: 'Un usuario debe ser proporcionado' });
    if (!id) return res.send({ status: 'Error', answer: 'Un id debe ser proporcionado' });
    manejadorCarta.eliminarCarta(user as string, parseInt(id as string), (error, result) => {
        res.send({ status: error ? 'Error' : 'Éxito', answer: error || result });
    });
    return; 
});

app.patch('/cards', (req, res) => {
    const { user, id } = req.query;
    const { id: bodyId } = req.body;
    if (!user) return res.send({ status: 'Error', answer: 'Un usuario debe ser proporcionado' });
    if (!id) return res.send({ status: 'Error', answer: 'Un id debe ser proporcionado' });
    if (parseInt(id as string) !== bodyId) {
        return res.send({ status: 'Error', answer: 'El id debe ser el mismo en el query y en el body' });
    }
    manejadorCarta.modificarCarta(user as string, JSONaCarta(req.body), (error, result) => {
        res.send({ status: error ? 'Error' : 'Éxito', answer: error || result });
    });
    return; 
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
