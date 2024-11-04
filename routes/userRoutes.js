const { signup, signin, createUserController, loginController, homepage, twofaPage, verify2faPage } = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/authMiddleware');

const express = require('express');
const router = express.Router();

router.get('/', signin);
router.post('/login', loginController);

router.get('/signup', signup);
router.post('/signup', createUserController);

router.get('/file', isAuthenticated, homepage);

router.get('/2fa', twofaPage);
router.post('/verify2fa', verify2faPage);

module.exports = router;