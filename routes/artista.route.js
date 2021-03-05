'use strict';

const express = require('express');
const router = express.Router();
const Artista = require('../models/artista.model')

router.post('/registrar-artista', (req, res) => {
    let artista = JSON.parse(req.body.obj);
    let nuevo_artista = new Artista({
        nombre: artista.nombre,
        casa_disquera: artista.casa_disquera,
        nacimiento: artista.nacimiento,
        edad: artista.edad
    });
    artista.lista_caciones.forEach(cancion => {
        nuevo_artista.lista_caciones.push(cancion._id)
    });
    artista.lista_albums.forEach(album => {
        nuevo_artista.lista_albums.push(album._id)
    });
    nuevo_artista.save((err, artista) => {
        if (err) {
            res.json({
                msj: 'El artista no se pudo registrar',
                err
            });
        } else {
            res.json({
                mjs: 'El artista  se registro correctamente',
                artista
            });
        }
    });
});

router.get('/listar-artistas', (req, res) => {
    Artista.find((err, lista) => {
        if (err) {
            res.json({
                msj: 'No se encontraron artistas',
                err
            });
        } else {
            res.json({
                lista
            });
        }
    });
});
router.get('/buscar-artista', (req, res) => {
    Artista.findOne({ _id: req.query._id }, (err, artista) => {
        if (err) {
            res.json({
                msj: 'No se encontró el artista',
                err
            });
        } else {
            res.json({
                artista
            });
        }
    });
});

router.put('/modificar-artista', (req, res) => {
    Artista.updateOne({ _id: req.body._id }, {
        $set: {
            nombre: req.body.nombre,
            casa_disquera: req.body.casa_disquera,
            nacimiento: req.body.nacimiento,
            edad: req.body.edad
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: 'No se pudo modificar el artista',
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