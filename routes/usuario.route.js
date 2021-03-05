const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario.model')

router.post('/registrar-usuario', (req, res) => {
    let obj_usuario = JSON.parse(req.body.obj)
    let nuevo_usuario = new Usuario({
        nombre_completo: obj_usuario.nombre_completo,
        nacimiento: obj_usuario.nacimiento,
        correo: obj_usuario.correo,
        genero: obj_usuario.genero,
        contraseña: obj_usuario.contraseña
    });
    /*
        obj_usuario.lista_listas.forEach(lista => {
            nuevo_usuario.lista_listas.push(lista._id)
        });
        obj_usuario.canciones_favortias.forEach(cancion => {
            nuevo_usuario.canciones_favortias.push(cancion._id)
        });*/
    nuevo_usuario.save((err, usuario) => {
        if (err) {
            res.json({
                msj: 'El usuario no se pudo registrar',
                err
            });
        } else {
            res.json({
                mjs: 'El usuario  se registro correctamente',
                usuario
            });
        }
    });
});

router.get('/listar-usuarios', (req, res) => {
    Usuario.find((err, lista) => {
        if (err) {
            res.json({
                msj: 'No se encontraron usuarios',
                err
            });
        } else {
            res.json({
                lista
            });
        }
    });
});
router.get('/buscar-usuario', (req, res) => {
    Usuario.findOne({ _id: req.query._id }, (err, usuario) => {
        if (err) {
            res.json({
                msj: 'No se encontró el usuario',
                err
            });
        } else {
            res.json({
                usuario
            });
        }
    });
});

router.put('/modificar-usuario', (req, res) => {
    Usuario.updateOne({ _id: req.body._id }, {
        $set: {
            nombre_completo: req.body.nombre_completo,
            nacimiento: req.body.nacimiento,
            correo: req.body.correo,
            genero: req.body.genero,
            contraseña: req.body.contraseña
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: 'No se pudo modificar el usuario',
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