const router = require('express').Router();

console.log('authRoutes loaded');

const authController = require('../controllers/authController');

console.log(authController);

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;