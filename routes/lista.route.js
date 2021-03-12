'use strict';
const express = require('express');
const router = express.Router();
const Lista = require('../models/listas.model');

router.post('/registrar-lista', (req, res) => {
    let lista = JSON.parse(req.body.obj);

    let nueva_lista = new Lista({
        nombre: lista.nombre
    });

    lista.lista_canciones.forEach(cancion => {
        nueva_lista.lista_canciones.push(cancion._id);
    });

    nueva_lista.save((err, rutina) => {
        if (err) {
            res.json({
                msj: 'La rutina no se pudo registrar',
                err
            });
        } else {
            res.json({
                msj: 'La rutina se registró correctamente',
                rutina
            });
        }
    });
});
router.get('/listar-lista', (req, res) => {
    Lista.find().populate({
        path: 'lista_canciones',
        populate: {
            path: 'artista',
            model: 'Artista'
        }
    }).exec((err, lista) => {
        if (err) {
            res.json({
                msj: 'No se encontraron albums',
                err
            });
        } else {
            res.json({
                lista
            });
        }
    });

});
router.put('eliminar-cancion-lista', (req, res) => {
    let canciones_eliminar = JSON.parse(req.body.lista_canciones);
    Lista.findById(req.body._id, (err, lista) => {
        if (err) {
            res.json({
                msj: 'La lista no se encontró',
                err
            });
        } else {
            canciones_eliminar.forEach(cancion => {
                lista.lista_canciones.pull(cancion)
            });
            rutina.save((err, rutina) => {
                if (err) {
                    res.json({
                        msj: 'La rutina no se pudo registrar',
                        err
                    });
                } else {
                    res.json({
                        msj: 'La rutina se registró correctamente',
                        rutina
                    });
                }
            });
        }
    });
});
router.post('/agregar-cancion', (req, res) => {
    let obj = JSON.parse(req.body.obj)
    Album.updateOne({ _id: obj._id }, {
        $push: {
            'lista_canciones': {
                nombre: obj.nombre,
                descripcion: obj.duracion
            }
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: 'No se pudo modificar el album',
                err
            });
        } else {
            res.json({
                info
            });
        }
    });

});



module.exports = router;