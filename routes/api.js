'use strict'

const express = require('express')
var router = express.Router()
const multer = require("multer");
const fileUpload = multer()
//Import controllers
const UsuarioCtrl = require('../controllers/usuario.js')
const RolCtrl = require('../controllers/rol.js')
const AuthCtrl = require('../controllers/auth.js')
const EventCtrl = require('../controllers/evento.js')
const ComerCtrl = require('../controllers/comercio.js')
const PromoComerCtrl = require('../controllers/promo_comercio.js')
const PromoEventCtrl = require('../controllers/promo_evento.js')
const EventComerCtrl = require('../controllers/evento_comercio.js')
const UploadCtrl = require('../controllers/file.js')
const InsCtrl=require('../controllers/inscripciones.js')
const CategoriasCtrl=require('../controllers/categoria.js')
const UsuComerCtrl = require('../controllers/usuario_comercio.js')
const UsuPromoCtrl = require('../controllers/userPromo.js')
const PromoCtrl = require('../controllers/promo.js')
/* const InscripUserCtrl= require('../controllers/inscripciones_usuarios.js') */

//Middlewares
const { verifySignUp, authJwt } = require("../middlewares");


//Helpers
const { selectByFk, createByFk, deleteByFk, updateByFk ,getIdByFk, uploadFile}= require("../controllers/helpers");



// Emulate Laravel apiResource method
router.apiResource = function(resource,controller,middleware=null) {
    let uriRUD, uriLC;
    let url = resource.split(".")
//  /eventos?active=true
    if(url.length === 1) {
        uriLC  = `/${url[0]}`
        uriRUD = `/${url[0]}/:id`
    }
    if(url.length === 2) {
        uriLC =`/${url[0]}/:id/${url[1]}`
        uriRUD =`/${url[0]}/:id/${url[1]}/:nid`
    }
    const ErrorCtrl = require('../controllers/error')
    router.get(uriLC, controller.index || ErrorCtrl.error404)
    middleware ? router.post(uriLC, middleware, controller.store || ErrorCtrl.error404) : router.post(uriLC, controller.store || ErrorCtrl.error404)
    router.get(uriRUD, controller.show || ErrorCtrl.error404)
    router.put(uriRUD, controller.update || ErrorCtrl.error404)
    router.delete(uriRUD, controller.destroy || ErrorCtrl.error404)    
}

//Auth

router.post(
    "/auth/register",
    AuthCtrl.signup
);

router.post("/auth/login", AuthCtrl.signin);
router.post("/auth/logout", AuthCtrl.signout);

router.get('/confirmation/:email/:token',AuthCtrl.confirmEmail)
router.post('/resend/:email',AuthCtrl.resendLink)
router.post('/forgot',AuthCtrl.forgotEmail)
router.post('/reset',AuthCtrl.resetPassword)



// CRUD products
/* router.put('/eventos/:id',EventCtrl.update)
router.put('/eventos/:id',EventCtrl.update)
router.post('/comercios',fileUpload.single('image'),ComerCtrl.store)
router.get('/comercios',ComerCtrl.index)
router.post('/eventos',fileUpload.single('image'),EventCtrl.store)
router.get('/eventos',EventCtrl.index)
router.get('/eventos/:id',EventCtrl.show) */

router.apiResource('usuarios', UsuarioCtrl)
router.apiResource('roles', RolCtrl)
router.apiResource('eventos',EventCtrl,fileUpload.single('image'))
router.get('/eventos/:id/comercios',EventCtrl.getComercios)
router.get('/eventos/:id/promociones',EventCtrl.getPromociones)
router.get('/comercios',ComerCtrl.index)
router.get('/comercios/:nif',ComerCtrl.search)


router.post('/comercios',fileUpload.single('image'),ComerCtrl.store)
/* router.apiResource('comercios', ComerCtrl) */
router.apiResource('comercios.promociones', PromoComerCtrl)
router.apiResource('eventos.promociones', PromoEventCtrl)
router.apiResource('comercios.eventos',EventComerCtrl)
router.apiResource('inscripciones', InsCtrl)
router.apiResource('promociones', PromoCtrl, fileUpload.single('image'))
router.apiResource('categorias', CategoriasCtrl)
router.apiResource('usuario_comercios',UsuComerCtrl )
router.get('/user_promo/:id/promociones',UsuPromoCtrl.getPromoUsedByUser)
router.get('/user_promo/:id/promociones/:nid',UsuPromoCtrl.thisPromoExist)
router.post('/user_promo/promociones',UsuPromoCtrl.store)


router.get('/comercios/:id/eventos', ComerCtrl.promos)
router.get('/usuarios/:id/eventos',UsuarioCtrl.inscripcion)
router.delete('/usuarios/:id/eventos',UsuarioCtrl.deleteInscripciones)
router.get('/usuarios/:id/promociones',UsuarioCtrl.promociones)
router.get('/usuarios/:id/promociones/:pid',UsuarioCtrl.getPromocion)
router.get('/usuarios/:dni/comercios/:id', UsuarioCtrl.getPromoComerAndUser)



//Upload
router.put('/file/:id',fileUpload.single('image'),UploadCtrl.updateUserAvatar)


module.exports = router