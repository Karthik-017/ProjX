const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth')


// Public routes
router.get('/:id/projects', userController.getUserProjects);

// Protected routes (user/admin)
router.get('/:id', auth.authenticate, userController.getUserById);

// Admin routes
router.get('/', auth.authenticate, auth.isAdmin, userController.getAllUsers);
router.delete('/:id', auth.authenticate, auth.isAdmin, userController.deleteUser);

router.get('/monitor/sellers', auth.authenticate, auth.isAdmin, userController.getSellersWithUnpaidStats);


module.exports = router;