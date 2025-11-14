const Amenity = require('../models/Amenity');


// ✅ Create Amenity (single or multiple)
exports.createAmenity = async (req, res) => {
    console.log("📩 /api/amenities/create route hit");
    console.log("Request body:", req.body);

    try {
        // If the request body is an array → bulk insert
        if (Array.isArray(req.body)) {
            const amenities = await Amenity.insertMany(req.body);
            return res.status(201).json({
                success: true,
                message: `✅ ${amenities.length} amenities added successfully.`,
            });
        }

        // Otherwise, create a single amenity
        const amenity = new Amenity(req.body);
        await amenity.save();

        res.status(201).json({
            success: true,
            message: "✅ Amenity added successfully.",
        });
    } catch (error) {
        console.error("🔥 Error creating amenity:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};



exports.getAllAmenities = async (req, res) => {
    try {
        const amenities = await Amenity.find({}, { _id: 1, name: 1, icon: 1 }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: amenities.length,
            data: amenities.map(a => ({
                id: a._id,
                name: a.name,
                icon: a.icon
            }))
        });
    } catch (error) {
        console.error("🔥 Error fetching amenities:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

// ✅ Update Amenity
exports.updateAmenity = async (req, res) => {
    try {
        const amenity = await Amenity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!amenity) return res.status(404).json({ message: 'Amenity not found' });
        res.status(200).json({ message: 'Amenity updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

// ✅ Delete Amenity
exports.deleteAmenity = async (req, res) => {
    try {
        const amenity = await Amenity.findByIdAndDelete(req.params.id);
        if (!amenity) return res.status(404).json({ message: 'Amenity not found' });
        res.status(200).json({ message: 'Amenity deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error });
    }
};
