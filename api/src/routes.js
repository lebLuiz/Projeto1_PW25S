const { Router } = require('express');
const AuthController = require('./app/controllers/AuthController');
const UserController = require('./app/controllers/UserController');
const checkToken = require('./app/middlewares/checkToken');

const router = Router();

router.post('/auth/register', AuthController.store);
router.post('/auth/login', AuthController.login);

router.get('/user/:id', checkToken, UserController.show);

module.exports = router;
