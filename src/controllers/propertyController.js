const Property = require('../models/Property');

exports.createProperty = async (req, res) => {
    try {
        const {
            project,
            title,
            description,
            propertyType,
            subCategory,        
            listingType,
            investmentDuration, 
            price,
            size,
            bedrooms,
            bathrooms,
            balconies,
            parkingSpaces,
            furnishingStatus,
            facingDirection,
            floorDetails,
            propertyAge,
            availableFrom,
            location,
            amenities,
            owner,
            propertyImages,
            brochures
        } = req.body;

        // 🏗️ Create new property
        const property = new Property({
            project,
            title,
            description,
            propertyType,
            subCategory,
            listingType,
            investmentDuration,
            price,
            size,
            bedrooms,
            bathrooms,
            balconies,
            parkingSpaces,
            furnishingStatus,
            facingDirection,
            floorDetails,
            propertyAge,
            availableFrom,
            location,
            amenities,
            owner,
            propertyImages,
            brochures
        });

        await property.save();

        res.status(201).json({
            success: true,
            message: "Property created successfully",
            propertyId: property._id,
        });
    } catch (error) {
        console.error("Error creating property:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};



exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find()
            .select('title propertyType listingType location propertyImages')
            .populate('project', 'name')
            .sort({ createdAt: -1 });

        const formattedProperties = properties.map((prop) => ({
            _id: prop._id,
            title: prop.title,
            propertyType: prop.propertyType,
            listingType: prop.listingType,
            location: prop.location,
            projectName: prop.project?.name || null,
            thumbnail: prop.propertyImages?.[0]?.imageUrl || null,
        }));

        res.status(200).json({
            success: true,
            count: formattedProperties.length,
            data: formattedProperties,
        });
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};




exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("project", "name developer")
      .populate("amenities", "name icon");

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        _id: property._id,
        title: property.title,
        description: property.description,
        propertyType: property.propertyType,
        subCategory: property.subCategory, // 🆕 Added
        listingType: property.listingType,
        investmentDuration: property.investmentDuration, // 🆕 Added
        price: property.price,
        size: property.size,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        balconies: property.balconies,
        parkingSpaces: property.parkingSpaces,
        furnishingStatus: property.furnishingStatus,
        facingDirection: property.facingDirection,
        floorDetails: property.floorDetails,
        propertyAge: property.propertyAge,
        availableFrom: property.availableFrom,
        location: property.location,
        project: property.project,
        amenities: property.amenities,
        owner: property.owner,
        propertyImages: property.propertyImages,
        brochures: property.brochures,
        createdAt: property.createdAt,
        updatedAt: property.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching property details:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};



exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
      .populate("project", "name developer")
      .populate("amenities", "name icon");

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: {
        _id: property._id,
        title: property.title,
        description: property.description,
        propertyType: property.propertyType,
        subCategory: property.subCategory, // 🆕 Added
        listingType: property.listingType,
        investmentDuration: property.investmentDuration, // 🆕 Added
        price: property.price,
        size: property.size,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        balconies: property.balconies,
        parkingSpaces: property.parkingSpaces,
        furnishingStatus: property.furnishingStatus,
        facingDirection: property.facingDirection,
        floorDetails: property.floorDetails,
        propertyAge: property.propertyAge,
        availableFrom: property.availableFrom,
        location: property.location,
        project: property.project,
        amenities: property.amenities,
        owner: property.owner,
        propertyImages: property.propertyImages,
        brochures: property.brochures,
        updatedAt: property.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};



exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Property deleted successfully',
            deletedId: property._id,
        });
    } catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

