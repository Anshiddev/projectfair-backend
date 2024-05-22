const express=require('express')
const router=express.Router()
const userController=require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const multerMiddle = require('../Middleware/multerMiddleware')
const jwtMiddleware = require('../Middleware/jwtMiddleware')

router.post('/register',userController.userRegister)
router.post('/login',userController.userLogin)
router.post('/add-project',jwtMiddleware,multerMiddle.single('image'),projectController.addProject)
router.get('/home-projects',projectController.homeProjects)
router.get('/all-projects',jwtMiddleware,projectController.allProjects)
router.get('/user-projects',jwtMiddleware,projectController.userProjects)
router.put('/edit-project/:pid',jwtMiddleware,multerMiddle.single('image'),projectController.editProject)
router.delete('/delete-project/:pid',jwtMiddleware,projectController.removeProject)
router.put('/profile-update',jwtMiddleware,multerMiddle.single('profile'),userController.profileUpdate)


module.exports=router