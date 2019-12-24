const Service = require('../models/Service');

// @desc    Get all available services
// @route   GET /v1
exports.getServices = async (req, res) => {
    try {
        const services = await Service.find();

        if (!services) {
            return res.status(404).send('No available services');
        }

        res.status(200).json({ success: true, services });
    } catch (error) {
        console.log(error);
    }
};

// @desc    Get single service by ID
// @route   GET /v1/:id
exports.getService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res
                .status(404)
                .send(`Service with ID of ${req.params.id} not found`);
        }

        res.status(200).json({ success: true, service });
    } catch (error) {}
};
