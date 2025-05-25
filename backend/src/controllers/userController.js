const prisma = require('../config/db');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: parseInt(req.params.id) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await prisma.user.delete({
      where: { id: parseInt(req.params.id) }
    });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getSellersWithUnpaidStats = async (req, res) => {
  try {
    const { status, eligibleOnly, startDate, endDate } = req.query;

    const paymentFilter = status === 'paid'
      ? { payment_status: true }
      : status === 'unpaid'
      ? { payment_status: false }
      : {}; // for all

    const dateFilter = (startDate && endDate) ? {
      createdAt: {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    } : {};

    // Fetch all purchases, join project -> user (seller)
    const purchases = await prisma.purchase.findMany({
      where: {
        ...paymentFilter,
        ...dateFilter
      },
      include: {
        project: {
          select: {
            user: {
              select: { id: true, name: true }
            }
          }
        }
      }
    });

    // Group by seller
    const sellerMap = {};
    for (const p of purchases) {
      const seller = p.project.user;
      if (!sellerMap[seller.id]) {
        sellerMap[seller.id] = {
          id: seller.id,
          name: seller.name,
          unpaidProjects: 0
        };
      }
      if (p.payment_status === false) {
        sellerMap[seller.id].unpaidProjects += 1;
      }
    }

    let result = Object.values(sellerMap);

    // Eligibility filter
    if (eligibleOnly === 'true') {
      result = result.filter(s => s.unpaidProjects >= 2);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
