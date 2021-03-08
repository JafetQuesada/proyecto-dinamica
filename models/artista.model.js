'use strict';
const mongoose = require('mongoose');

const schema_artista = mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    casa_disquera: { type: String, required: true, unique: false },
    nacimiento: { type: Date, required: true, unique: false },
    edad: { type: Number, required: true, unique: false },
});

module.exports = mongoose.model('Artista', schema_artista, 'artista');