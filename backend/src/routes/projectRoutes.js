const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth')

router.get('/unapproved', auth.authenticate, auth.isAdmin, projectController.getUnapprovedProjects);
router.get('/search', projectController.searchProjects);
// Public routes
router.get('/', projectController.getAllProjects);
router.get('/category/:category', projectController.getProjectsByCategory);
router.get('/:id', projectController.getProjectById);

// router.get('/search', projectController.searchProjects);

// Protected routes (user)
router.post('/', auth.authenticate, projectController.createProject);
router.put('/:id', auth.authenticate, projectController.updateProject);
router.delete('/:id', auth.authenticate, projectController.deleteProject);

// Admin routes
// router.get('/unapproved', auth.authenticate, auth.isAdmin, projectController.getUnapprovedProjects);
router.patch('/:id/approve', auth.authenticate, auth.isAdmin, projectController.approveProject);

module.exports = router;