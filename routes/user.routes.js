const express = require('express');
const { userSignup,userSignIn,userLogout,getUser, authUser } = require('../controllers/user.controllers.js');
const isLoggedIn = require('../middlewares/auth.middleware.js');
const { getSkill, addSkill, removeSkills } = require('../controllers/skill.controllers.js');
const { getProjects, addProject, deleteProjects, updateProjects } = require('../controllers/project.controllers.js');
const upload = require('../middlewares/multer.middleware.js');
const { contact } = require('../controllers/email.controller.js');
const router = express.Router();


router.post('/signup',userSignup);
router.post('/login',userSignIn);
router.get('/logout',isLoggedIn,userLogout);

// User routes
router.get('/getuser/:id',getUser);
router.get('/authuser',isLoggedIn,authUser);

// Skills routes
router.get('/getSkills',getSkill);
router.post('/addSkills',addSkill);
router.delete('/removeSkills/:id',removeSkills);
module.exports = router;

// project routes
router.get('/project',getProjects)
router.post('/addproject',upload.single("image"),addProject);
router.delete('/removeProject/:id',deleteProjects)
router.put('/updateProject/:id',upload.single('image'),updateProjects)


// contact routes
router.post('/contact',contact);