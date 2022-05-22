const express = require('express')
const router = express.Router()

const mdAuth = require('../middlewares/Auth')
const AuthValidator = require('../validators/AuthValidator')
const UserValidator = require('../validators/UserValidator')

const AuthController = require('../controllers/AuthController')
const UserController = require('../controllers/UserController')
const AdsController = require('../controllers/AdsController')



router.get('/ping', (req,res)=>{
    res.json({pong: true})
})

router.get('/states', UserController.getStates);

router.post('/user/signin', AuthValidator.signin,AuthController.signin)
router.post('/user/signup', AuthValidator.signup,  AuthController.signup)

router.get('/user/me', mdAuth.private, UserController.info)
router.put('/user/me',  mdAuth.private, UserValidator.editAction, UserController.editAction)

router.get('/categories', AdsController.getCategories)

router.post('/ad/add',  mdAuth.private, AdsController.addAction)
router.get('/ad/list', AdsController.getList)
router.get('/ad/item', AdsController.getItem)
router.post('/ad/:id',  mdAuth.private, AdsController.editAction)

module.exports = router;