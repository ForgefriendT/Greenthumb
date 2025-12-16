const Plant = require('../models/Plant');

// Get all plants for a user
exports.getPlants = async (req, res) => {
    try {
        const plants = await Plant.find({ user: req.user.id });
        res.json(plants);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Add a new plant
exports.addPlant = async (req, res) => {
    try {
        const { name, wateringFreq, notes, lastWatered, image } = req.body;

        const nextDate = new Date(lastWatered || Date.now());
        nextDate.setDate(nextDate.getDate() + parseInt(wateringFreq));

        const newPlant = new Plant({
            name,
            wateringFreq,
            notes,
            lastWatered,
            nextWateringDate: nextDate,
            image,
            user: req.user.id,
        });

        const plant = await newPlant.save();
        res.json(plant);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Water a plant
exports.waterPlant = async (req, res) => {
    try {
        let plant = await Plant.findById(req.params.id);

        if (!plant) return res.status(404).json({ msg: 'Plant not found' });

        if (plant.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Update lastWatered to now
        plant.lastWatered = Date.now();

        // Recalculate nextWateringDate
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + parseInt(plant.wateringFreq));
        plant.nextWateringDate = nextDate;

        await plant.save();
        res.json(plant);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete a plant
exports.deletePlant = async (req, res) => {
    try {
        let plant = await Plant.findById(req.params.id);

        if (!plant) return res.status(404).json({ msg: 'Plant not found' });

        // Make sure user owns plant
        if (plant.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await plant.deleteOne();

        res.json({ msg: 'Plant removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
