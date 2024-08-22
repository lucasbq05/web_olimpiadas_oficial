const { Router } = require('express');
const enrutador = Router();

const TicketsController = require('../controladores/TicketsController');

enrutador.get('/Tickets/mostrar', TicketsController.MostrarTickets);

enrutador.post('/Tickets/nuevo', TicketsController.NuevoTickets);

enrutador.put('/Tickets/modificar', TicketsController.ModificarTickets);

module.exports = enrutador;