const ChannelPartnerQuery = require('../models/ChannelPartnerQuery');

// Create a new channel partner query (public)
exports.createQuery = async (req, res) => {
    try {
        const query = new ChannelPartnerQuery(req.body);
        await query.save();
        res.status(201).json({ message: 'Query submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all queries (admin only)
exports.getAllQueries = async (req, res) => {
    try {
        const queries = await ChannelPartnerQuery.find().sort({ createdAt: -1 });
        res.status(200).json(queries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a query by ID (admin only)
exports.deleteQuery = async (req, res) => {
    try {
        const query = await ChannelPartnerQuery.findByIdAndDelete(req.params.id);
        if (!query) {
            return res.status(404).json({ message: 'Query not found' });
        }
        res.status(200).json({ message: 'Query deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
