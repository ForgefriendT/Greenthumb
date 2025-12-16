const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const plantController = require('../controllers/plantController');

// @route   GET api/plants
// @desc    Get all users plants
// @access  Private
router.get('/', auth, plantController.getPlants);

// @route   POST api/plants
// @desc    Add new plant
// @access  Private
router.post('/', auth, plantController.addPlant);

// @route   PUT api/plants/:id/water
// @desc    Water a plant
// @access  Private
router.put('/:id/water', auth, plantController.waterPlant);

// @route   DELETE api/plants/:id
// @desc    Delete plant
// @access  Private
router.delete('/:id', auth, plantController.deletePlant);

module.exports = router;
