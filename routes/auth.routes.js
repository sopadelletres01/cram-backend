const express = require('express')
const router = express.Router();
const AuthCtrl = require('../controllers/auth')
const { isAuthenticated } = require('./../middlewares/authJwt.js');

router.post(
    "/register",
    AuthCtrl.signup
);

router.post("/login", AuthCtrl.signin);
router.post("/logout", AuthCtrl.signout);
router.get('/confirmation/:email/:token',AuthCtrl.confirmEmail)
router.post('/resend/:email',AuthCtrl.resendLink)
router.post('/forgot',AuthCtrl.forgotEmail)
router.post('/reset', AuthCtrl.resetPassword)

router.get('/verify', isAuthenticated, (req, res, next) => {
	// If JWT token is valid the payload gets decoded by the
	// isAuthenticated middleware and made available on `req.payload`
	//console.log(`req.payload`, req.payload);

	// Send back the object with user data
	// previously set as the token payload
	res.status(200).json(req.payload);
});

module.exports = router;