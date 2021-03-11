'use strict';
const mongoose = require('mongoose');

const schema_usuario = mongoose.Schema({
    nombre_completo: { type: String, required: true, unique: false },
    nacimiento: { type: String, required: true, unique: false },
    correo: { type: String, required: true, unique: true },
    genero: { type: String, required: true, unique: false },
    contrasenna: { type: String, required: true, unique: false },
    tipo: { type: String, required: true, unique: false },
    lista_listas: [{
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: 'Listas'
    }],
    canciones_favoritas: [{
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: 'canciones_favoritas'
    }]
});

module.exports = mongoose.model('Usuario', schema_usuario, 'usuario');