const { Router } = require('express');
const enrutador = Router();
const Tickets = require('../models/Tickets');
enrutador.get('/prueba', (req, res) => { // RUTAS 
    res.send("Esta es una prueba");
    
});


//traer la lista de post
enrutador.get('/listarTodo', async (req, res) => { // RUTAS 
    try {
        const lista = await Tickets.find().lean();
        console.log(JSON.stringify(lista));
        res.status(200).json(lista);

    } catch(e){
        res.status(500).json({error: e});
    }
    
});


module.exports = enrutador;