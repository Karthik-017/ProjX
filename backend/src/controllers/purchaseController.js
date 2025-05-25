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

    // Check if the user has already purchased this project
    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        projectId: parseInt(projectId),
        buyerUserId: req.user.id
      }
    });

    if (existingPurchase) {
      return res.status(400).json({ message: 'Project already purchased' });
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


// exports.getSellerPurchases = async (req, res) => {
//   try {
//     const sellerId = parseInt(req.params.id);

//       // Check if requester is the seller or an admin
//     if (req.user.id !== sellerId && req.user.role !== 'admin') {
//       return res.status(403).json({ message: 'Not authorized to view this data' });
//     }

//     const purchases = await prisma.purchase.findMany({
//       where: {
//         sellerUserId: sellerId
//       },
//       select: {
//         createdAt: true,
//         priceAtPurchase: true,
//         payment_status: true,
//         project: {
//           select: {
//             title: true
//           }
//         }
//       },
//       orderBy: {
//         createdAt: 'desc'
//       }
//     });

//     res.status(200).json(purchases);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.getSellerPurchases = async (req, res) => {
  try {
    const sellerId = req.user.id; // Seller ID from middleware

    // Check if the user is an admin or the seller themselves
    if (req.user.role !== 'admin' && req.user.id !== sellerId) {
      return res.status(403).json({ message: 'Not authorized to view this data' });
    }

    const purchases = await prisma.purchase.findMany({
      where: {
        sellerUserId: sellerId
      },
      select: {
        createdAt: true,
        priceAtPurchase: true,
        payment_status: true,
        project: {
          select: {
            title: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getSellerTransactions = async (req, res) => {
  const sellerId = parseInt(req.params.id);

  try {

    const seller = await prisma.user.findUnique({
      where: { id: sellerId },
      select: { name: true }
    });

    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }


    const transactions = await prisma.purchase.findMany({
      where: { sellerUserId: sellerId },
      select: {
        id: true, // purchaseId
        priceAtPurchase: true,
        payment_status: true,
        createdAt: true,
        project: {
          select: {
            id: true,
            title: true
          }
        },
        buyer: {
          select: {
            name: true
          }
        },
        // seller is not directly related in purchase, but we can infer from user ID
      }
    });

    const result = transactions.map(tx => ({
  purchaseId: tx.id,
  projectId: tx.project?.id,
  projectTitle: tx.project?.title,
  sellerName: seller.name,
  buyerName: tx.buyer?.name || 'Unknown Buyer',
  price: tx.priceAtPurchase,
  createdDate: tx.createdAt,
  payment_status: tx.payment_status
}));


    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updatePaymentStatus = async (req, res) => {
  const { purchaseId } = req.params;
  const { payment_status } = req.body;

  try {
    const updatedPurchase = await prisma.purchase.update({
      where: { id: parseInt(purchaseId) },
      data: {
        payment_status: payment_status
      }
    });

    res.status(200).json({
      message: 'Payment status updated successfully',
      updatedPurchase
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};