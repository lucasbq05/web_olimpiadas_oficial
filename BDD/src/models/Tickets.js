const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');
const TicketsSchema = new Schema({
    Personal: {
        type: String,
         required: true
    },
    Usuario: {
        type:String,
        required: true
    },
    Problema: {
        type: String,
        required: true,
    },
   }, {
        timestamps: true
   });
   
// Creamos función que encripta contraseña
//TicketsSchema.methods.encriptarPass = async password => {
//    const salt = await bcrypt.genSalt(10);
//    return await bcrypt.hash(password, salt);
//}
    
// Función para verificar si la contraseña es correcta
//TicketsSchema.methods.matchPassword = async function (password) {
//    return await bcrypt.compare(password, this.password);
//}

// Modelo creado a partir del esquema
module.exports = model('CrearTickets', TicketsSchema, 'CrearTickets');