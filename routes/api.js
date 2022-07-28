'use strict';

const express = require('express');
var router = express.Router();
const multer = require('multer');
const fileUpload = multer();
//Import controllers
const UserCtrl = require('../controllers/user.js');
const RolCtrl = require('../controllers/rol.js');
// const AuthCtrl = require('../controllers/auth.js')
const EventCtrl = require('../controllers/event.js');
const ComerCtrl = require('../controllers/commerce.js');
const PromoComerCtrl = require('../controllers/promo_commerce.js');
const PromoEventCtrl = require('../controllers/promo_event.js');
const EventComerCtrl = require('../controllers/event_commerce.js');
const UploadCtrl = require('../controllers/file.js');
const InsCtrl = require('../controllers/inscriptions.js');
// const CategoriasCtrl=require('../controllers/categoria.js')
const UsuComerCtrl = require('../controllers/user_commerce');
const UsuPromoCtrl = require('../controllers/user_promo.js');
const PromoCtrl = require('../controllers/promo.js');
/* const InscripUserCtrl= require('../controllers/Inscriptions_usuarios.js') */

//Middlewares
const { verifySignUp, authJwt } = require('../middlewares');

//Helpers
const { selectByFk, createByFk, deleteByFk, updateByFk, getIdByFk, uploadFile } = require('../controllers/helpers');

// Emulate Laravel apiResource method
router.apiResource = function (resource, controller, middleware = null) {
  let uriRUD, uriLC;
  let url = resource.split('.');
  //  /events?active=true
  if (url.length === 1) {
    uriLC = `/${url[0]}`;
    uriRUD = `/${url[0]}/:id`;
  }
  if (url.length === 2) {
    uriLC = `/${url[0]}/:id/${url[1]}`;
    uriRUD = `/${url[0]}/:id/${url[1]}/:nid`;
  }
  const ErrorCtrl = require('../controllers/error');
  router.get(uriLC, controller.index || ErrorCtrl.error404);
  middleware ? router.post(uriLC, middleware, controller.store || ErrorCtrl.error404) : router.post(uriLC, controller.store || ErrorCtrl.error404);
  router.get(uriRUD, controller.show || ErrorCtrl.error404);
  router.put(uriRUD, controller.update || ErrorCtrl.error404);
  router.delete(uriRUD, controller.destroy || ErrorCtrl.error404);
};
// CRUD products
/* router.put('/events/:id',EventCtrl.update)
router.put('/events/:id',EventCtrl.update)
router.post('/commerces',fileUpload.single('image'),ComerCtrl.store)
router.get('/commerces',ComerCtrl.index)
router.post('/events',fileUpload.single('image'),EventCtrl.store)
router.get('/events',EventCtrl.index)
router.get('/events/:id',EventCtrl.show) */

router.apiResource('users', UserCtrl);
router.apiResource('roles', RolCtrl);
// router.apiResource('events', EventCtrl, fileUpload.single('image'));
router.get('/events', EventCtrl.getEvents);
router.get('/promotions/free', PromoCtrl.getPromotionsByFreeEvents);

router.get('/events/:id/commerces', EventCtrl.getComercios);      
router.get('/events/:id', EventCtrl.show);

// para coger todas las promociones de un evento.
router.get('/events/:id/promotions', EventCtrl.getPromotions);
router.get('/commerces', ComerCtrl.index);
router.get('/commerces/:nif', ComerCtrl.search);

router.post('/commerces', fileUpload.single('image'), ComerCtrl.store);
router.post('/inscriptions', InsCtrl.store)
/* router.apiResource('commerces', ComerCtrl) */
// router.apiResource('commerces.promotions', PromoComerCtrl);
router.apiResource('events.promotions', PromoEventCtrl);
router.apiResource('commerces.events', EventComerCtrl);
router.apiResource('inscriptions', InsCtrl);
router.get('/promotions/:id', PromoCtrl.getPromotionsAllShow)
router.apiResource('promotions', PromoCtrl, fileUpload.single('image'));
router.apiResource('usuario_comercios', UsuComerCtrl);
router.get('/commerces/:id/promotions', PromoCtrl.getPromotionsByCommerce)
router.get('/user_promo/:id/promotions', UsuPromoCtrl.getPromoUsedByUser);
router.get('/user_promo/:id/promotions/:nid', UsuPromoCtrl.thisPromoExist);
router.post('/user_promo/promotions', UsuPromoCtrl.store);

router.get('/QR/validate/:idUser/:idPromo',UsuPromoCtrl.validate)
router.get('/QR/generate/:idUser/:idPromo',UsuPromoCtrl.generate)

router.get('/commerces/:id/events', ComerCtrl.promotions);
router.get('/users/:id/events', UserCtrl.inscription);
router.delete('/users/:id/events', UserCtrl.deleteInscriptions);
router.get('/users/:id/promotions', UserCtrl.getPromotions);
router.get('/user/promotions/:id', UserCtrl.getPromotion);
router.get('/users/:dni/commerces/:id', UserCtrl.getPromoComerAndUser);

//Upload
router.put('/file/:id', fileUpload.single('image'), UploadCtrl.updateUserAvatar);

module.exports = router;
