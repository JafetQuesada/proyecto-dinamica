const express = require('express');
const router = express.Router();
const Album = require('../models/artista.model')

router.post('/registrar-artista', (req, res) => {
    let obj_album = JSON.parse(req.body.obj);
    let album = new Album({
        codigo: obj_album.codigo,
        nombre: obj_album.nombre,
        lanzamiento: obj_album.album,
        cant_canciones: obj_album.cant_canciones,
        duracion: obj_album.duracion
    });
    /*obj_album.lista_canciones.forEach(cancion => {
        album.lista_canciones.push(cancion._id);
    });*/
    album.save((err, album) => {
        if (err) {
            res.json({
                msj: 'El album no se pudo registrar',
                err
            });
        } else {
            res.json({
                mjs: 'El album  se registro correctamente',
                album
            });
        }
    });
});

router.get('/listar-album', (req, res) => {
    Album.find((err, lista) => {
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
router.get('/buscar-album', (req, res) => {
    Album.findOne({ _id: req.query._id }, (err, album) => {
        if (err) {
            res.json({
                msj: 'No se encontró el album',
                err
            });
        } else {
            res.json({
                album
            });
        }
    });
});

router.put('/modificar-album', (req, res) => {
    Album.updateOne({ _id: req.body._id }, {
        $set: {
            codigo: req.body.codigo,
            nombre: req.body.nombre,
            lanzamiento: req.body.lanzamiento,
            cant_canciones: req.body.cant_canciones,
            duracion: req.body.duracion
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