const { Router } = require("express");
const multer = require('multer');
const uploadConfig = require('../config/upload');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const UserController = require("../controller/userController");
const UserAvatarController = require("../controller/UserAvatarController")

const userRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const userController = new UserController();
const userAvatarController = new UserAvatarController();

userRoutes.post("/", userController.create);
userRoutes.put("/", ensureAuthenticated, userController.update);
userRoutes.patch("/avatar", ensureAuthenticated, upload.single('avatar'), userAvatarController.update)

module.exports = userRoutes;