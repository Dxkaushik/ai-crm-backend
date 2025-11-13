const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Only Admin, Director, and Manager can create/update/delete projects
router.post('/', protect, restrictTo('Admin', 'Director', 'Manager'), projectController.createProject);
router.put('/:id', protect, restrictTo('Admin', 'Director', 'Manager'), projectController.updateProject);
router.delete('/:id', protect, restrictTo('Admin', 'Director', 'Manager'), projectController.deleteProject);

// Anyone logged in can view projects
router.get('/', protect, projectController.getProjects);
router.get('/:id', protect, projectController.getProjectById);

module.exports = router;
