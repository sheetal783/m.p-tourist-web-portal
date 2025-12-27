const Destination = require('../models/Destination');

// @desc    Get all destinations
// @route   GET /api/destinations
// @access  Public
const getDestinations = async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = {};
    if (category) {
      query.categoryId = category.toLowerCase();
    }
    
    const destinations = await Destination.find(query).sort({ name: 1 });
    
    res.json({
      success: true,
      count: destinations.length,
      data: destinations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching destinations',
      error: error.message
    });
  }
};

// @desc    Get single destination by slug
// @route   GET /api/destinations/:slug
// @access  Public
const getDestinationBySlug = async (req, res) => {
  try {
    const destination = await Destination.findOne({ slug: req.params.slug });
    
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }
    
    res.json({
      success: true,
      data: destination
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching destination',
      error: error.message
    });
  }
};

module.exports = {
  getDestinations,
  getDestinationBySlug
};






