const prisma = require('../config/db');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { isApproved: true },
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

exports.getAllProjectsBulk = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
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

exports.getUnapprovedProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { isApproved: false },
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


// exports.getProjectById = async (req, res) => {
//   try {
//     const project = await prisma.project.findUnique({
//       where: { id: parseInt(req.params.id) },
//       include: {
//         user: {
//           select: {
//             id: true,
//             name: true,
//             email: true
//           }
//         },
//         purchases: {
//           where: {
//             buyerUserId: req.user?.id
//           },
//           select: {
//             id: true
//           }
//         }
//       }
//     });

//     console.log(project.userId);
//     console.log(req.user?.id);
    
    
//     if (!project) {
//       return res.status(404).json({ message: 'Project not found' });
//     }

//     // Clone the project object to modify it
//     const projectResponse = { ...project };

//     // Check if user has purchased this project or is the owner
//     const hasPurchased = project.purchases.length > 0;
//     const isOwner = project.userId === req.user?.id;
//     const isAdmin = req.user?.role === 'admin';

//     // Hide sensitive URLs if user doesn't have access
//     if (!hasPurchased && !isOwner && !isAdmin) {
//       projectResponse.documentsUrl = null;
//       projectResponse.folderUrl = null;
//     }

//     res.status(200).json(projectResponse);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.getProjectById = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    
    // Base query without purchases
    const baseQuery = {
      where: { id: projectId },
      include: {
        user: { select: { id: true, name: true, email: true } }
      }
    };

    // Conditionally include purchases if user is authenticated
    if (req.user) {
      baseQuery.include.purchases = {
        where: { buyerUserId: req.user.id },
        select: { id: true }
      };
    }

    const project = await prisma.project.findUnique(baseQuery);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    console.log("project"+project.userId);
    console.log("req"+req.user.id);
    // Determine access rights
    const isOwner = req.user && project.userId === req.user.id;
    const isAdmin = req.user && req.user.role === 'admin';
    const hasPurchased = req.user && project.purchases?.length > 0;

    // Clone project to modify sensitive data
    const projectResponse = { ...project };
    
    // Hide private URLs if no access
    if (!isOwner && !isAdmin && !hasPurchased) {
      projectResponse.documentsUrl = null;
      projectResponse.folderUrl = null;
    }

    res.status(200).json(projectResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { title, description, category, technologies, deployedUrl, videoUrl, documentsUrl, folderUrl, price } = req.body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        category,
        technologies: technologies.split(',').map(tech => tech.trim()),
        deployedUrl,
        videoUrl,
        documentsUrl,
        folderUrl,
        price: parseFloat(price),
        userId: req.user.id
      }
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { title, description, category, technologies, deployedUrl, videoUrl, documentsUrl, folderUrl, price } = req.body;

    // Check if project exists and belongs to user
    const existingProject = await prisma.project.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!existingProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (existingProject.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }

    const project = await prisma.project.update({
      where: { id: parseInt(req.params.id) },
      data: {
        title,
        description,
        category,
        technologies: technologies.split(',').map(tech => tech.trim()),
        deployedUrl,
        videoUrl,
        documentsUrl,
        folderUrl,
        price: parseFloat(price)
      }
    });

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    // Check if project exists and belongs to user
    const existingProject = await prisma.project.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!existingProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (existingProject.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    await prisma.project.delete({
      where: { id: parseInt(req.params.id) }
    });

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.approveProject = async (req, res) => {
  try {
    const project = await prisma.project.update({
      where: { id: parseInt(req.params.id) },
      data: { isApproved: true }
    });

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjectsByCategory = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        isApproved: true,
        category: req.params.category
      },
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

exports.searchProjects = async (req, res) => {
  try {
    const { q } = req.query;
    const projects = await prisma.project.findMany({
      where: {
        isApproved: true,
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } }
        ]
      },
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