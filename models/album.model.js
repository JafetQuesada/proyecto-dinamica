'use strict';
const mongoose = require('mongoose');

const schema_album = mongoose.Schema({
    codigo: { type: String, required: true, unique: true },
    nombre: { type: String, required: true, unique: false },
    lanzamiento: { type: Date, required: true, unique: false },
    cant_canciones: { type: Number, required: true, unique: false },
    duracion: { type: Number, required: true, unique: false },
    lista_canciones: [{
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: 'Cancion'
    }]
});

module.exports = mongoose.model('Album', schema_album, 'album');