//importamos el modelo
const Tickets = require('../models/Tickets.js');

//creamos el nuevo controlador
const TicketsController = {};

TicketsController.MostrarTickets = async (req, res) => {
 const listado = await Tickets.find(); //treaemos todos los datos del modelo
 res.send(listado); //lo enviamossssssss
}

TicketsController.ModificarTickets = async (req, res) => {
    return 0;
   } 
   

TicketsController.NuevoTickets= async (req, res) => {
    // Para obtener un dato en particular
    const { Personal, Usuario, Problema } = req.body;
    console.log(req.body);

    // Si existen los 4 datos
    if ( Personal && Usuario && Problema ) {
        // Creamos un nuevo item
        const Nuevotickets = new Tickets ({Personal, Usuario, Problema});
        console.log(this.Nuevotickets);


        try {
            // Guardamos el nuevo item 
            let r = await Nuevotickets.save();

            // Verificamos si se creó el recurso
            if (r){
                res.status(200).json({msg: 'Ticket creado'});
            } else {
                res.status(500).json({error: 'No se pudo crear el Ticket'});
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({error: e});
        }
        
    }
    else {
        res.status(500).json({error: 'faltan datos'});
    }

    
};

TicketsController.EliminarItem = async (req, res) => {
    const id = req.params.id;

    if (id){
        console.log(id);
        
        try{
            await Tickets.findByIdAndDelete(id);
        }
        catch (err) { 
            console.log("Error en el delete: "+error);
            res.status(500).json({error: err});
        }

        res.send("ID ELIMINADO");
    } else{
        res.send("Falta ID");
    }
};


module.exports = TicketsController;