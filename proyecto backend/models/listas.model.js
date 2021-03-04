'use strict';
const mongoose = require('mongoose');

const schema_listas = mongoose.Schema({
    nombre: { type: String, required: true, unique: false },
    lista_canciones: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cancion'
    }]
});

module.exports = mongoose.model('Lista', schema_listas, 'lista');