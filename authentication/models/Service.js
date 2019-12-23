const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Service name is required']
    },
    description: {
        type: String,
        required: [true, 'Service description is required']
    }
});

module.exports = mongoose.model('Service', ServiceSchema);
