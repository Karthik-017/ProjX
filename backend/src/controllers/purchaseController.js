const prisma = require('../config/db');

exports.createPurchase = async (req, res) => {
  try {
    const { projectId } = req.body;

    // Check if project exists and is approved
    const project = await prisma.project.findUnique({
      where: { id: parseInt(projectId) }
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!project.isApproved) {
      return res.status(400).json({ message: 'Project not approved for sale' });
    }

    // Check if user is not buying their own project
    if (project.userId === req.user.id) {
      return res.status(400).json({ message: 'Cannot purchase your own project' });
    }

    // Create purchase record
    const purchase = await prisma.purchase.create({
      data: {
        projectId: parseInt(projectId),
        buyerUserId: req.user.id,
        sellerUserId: project.userId,
        priceAtPurchase: project.price
      }
    });

    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await prisma.purchase.findMany({
      include: {
        project: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        },
        buyer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserPurchases = async (req, res) => {
  try {
    const purchases = await prisma.purchase.findMany({
      where: { buyerUserId: parseInt(req.params.id) },
      include: {
        project: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPurchaseById = async (req, res) => {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        project: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        },
        buyer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    // Check if user is buyer, seller, or admin
    if (purchase.buyerUserId !== req.user.id && 
        purchase.sellerUserId !== req.user.id && 
        req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this purchase' });
    }

    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};