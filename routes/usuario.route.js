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
        contrasenna: obj_usuario.contrasenna
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
    Usuario.find().populate('lista_listas').exec((err, lista) => {
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
    let obj = JSON.parse(req.body.obj)
    Usuario.updateOne({ _id: obj._id }, {
        $set: {
            nombre_completo: obj.nombre_completo,
            nacimiento: obj.nacimiento,
            correo: obj.correo,
            genero: obj.genero,
            contraseña: obj.contraseña
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
router.post('/iniciar-sesion', (req, res) => {
    let correo = req.body.correo;
    let contrasenna = req.body.contrasenna;

    Usuario.findOne({ correo: correo }, (err, usuario) => {
        if (err) {
            res.json({
                msj: 'El correo electrónico o la contraseña no son correctos',
                inicio: false,
                err
            });
        } else {
            if (usuario && usuario.contrasenna == contrasenna) {
                res.json({
                    correo: usuario.correo,
                    tipo: usuario.tipo,
                    nombre: usuario.nombre,
                    inicio: true
                });
            } else {
                res.json({
                    msj: 'El correo electrónico o la contraseña no son correctos',
                    inicio: false,
                    err
                });
            }


        }
    });


});
module.exports = router;