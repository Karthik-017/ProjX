const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth')


// Protected routes (user)
router.post('/', auth.authenticate, purchaseController.createPurchase);
router.get('/user/:id', auth.authenticate, purchaseController.getUserPurchases);
router.get('/:id', auth.authenticate, purchaseController.getPurchaseById);

// Admin routes
router.get('/', auth.authenticate, auth.isAdmin, purchaseController.getAllPurchases);

module.exports = router;