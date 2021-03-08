const express = require('express');
const router = express.Router();
const Cancion = require('../models/cancion.model')

router.post('/registrar-cancion', (req, res) => {
    let obj_cancion = JSON.parse(req.body.obj);
    let cancion = new Cancion({
        nombre: obj_cancion.nombre,
        duracion: obj_cancion.duracion,
    });
    obj_cancion.artista.forEach(artisa => {
        cancion.artista.push(artisa._id);
    });
    cancion.save((err, cancion) => {
        if (err) {
            res.json({
                msj: 'La canción no se pudo registrar',
                err
            });
        } else {
            res.json({
                mjs: 'La canción  se registro correctamente',
                cancion
            });
        }
    });
});

router.get('/listar-cancion', (req, res) => {
    Cancion.find((err, lista) => {
        if (err) {
            res.json({
                msj: 'No se encontraron canciones',
                err
            });
        } else {
            res.json({
                lista
            });
        }
    });
});
router.get('/buscar-cancion', (req, res) => {
    Cancion.findOne({ _id: req.query._id }, (err, cancion) => {
        if (err) {
            res.json({
                msj: 'No se encontró la canción',
                err
            });
        } else {
            res.json({
                cancion
            });
        }
    });
});

router.put('/modificar-cancion', (req, res) => {
    let obj = JSON.parse(req.body.obj)
    Cancion.updateOne({ _id: obj._id }, {
        $set: {
            nombre: obj.nombre,
            duracion: obj.duracion
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: 'No se pudo modificar la canción',
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