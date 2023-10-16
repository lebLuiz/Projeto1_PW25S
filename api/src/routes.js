const { Router } = require('express');
const AuthController = require('./app/controllers/AuthController');
const UserController = require('./app/controllers/UserController');
const checkToken = require('./app/middlewares/checkToken');
const onlyAdminAccess = require('./app/middlewares/onlyAdminAccess');
const CategoryController = require('./app/controllers/CategoryController');
const TicketController = require('./app/controllers/TicketController');

const router = Router();

router.post('/auth/register', AuthController.store);
router.post('/auth/login', AuthController.login);

router.get('/user/me', checkToken, UserController.me);
router.get('/user/:id', checkToken, UserController.show);
router.get('/user/tecs/list', checkToken, onlyAdminAccess, UserController.listTecs);

router.get('/categories', checkToken, CategoryController.index);
router.post('/categories', checkToken, onlyAdminAccess, CategoryController.store);
router.put('/categories', checkToken, onlyAdminAccess, CategoryController.update);
router.delete('/categories/:id', checkToken, onlyAdminAccess, CategoryController.delete);

router.get('/tickets', checkToken, TicketController.index);
router.get('/tickets/list', checkToken, TicketController.list);
router.get('/tickets/list/tecs', checkToken, TicketController.listTecs);
router.post('/tickets', checkToken, TicketController.store);
router.put('/tickets/tec', checkToken, onlyAdminAccess, TicketController.updateUserTec);
router.put('/tickets/status', checkToken, TicketController.updateStatus);

module.exports = router;
