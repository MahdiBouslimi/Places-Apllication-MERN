const express =require('express');
const {check} = require('express-validator')

const UsersControllers = require('../controllers/users-controllers');
const fileUpload = require('../middelware/file-upload')

const router = express.Router();

router.get('/',UsersControllers.getUsers);

router.post(
    '/signup',
    fileUpload.single('image'),
    [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(), //test@test.com => test@test.com
    check('password').isLength({min : 6})
    ],
UsersControllers.signup);

router.post('/login',UsersControllers.login);


module.exports = router;