import Hospital from '../models/Hospital.js';

// Create new hospital
export const createHospital = async (req, res) => {
  try {
    const hospital = new Hospital(req.body);
    const savedHospital = await hospital.save();
    res.status(201).json({
      success: true,
      data: savedHospital
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get hospitals by city
export const getHospitalsByCity = async (req, res) => {
  try {
    const { city } = req.query;
    const query = city ? { city: { $regex: city, $options: 'i' } } : {};
    
    const hospitals = await Hospital.find(query);
    res.status(200).json({
      success: true,
      count: hospitals.length,
      data: hospitals
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete hospital
export const deleteHospital = async (req, res) => {
  try {
    const { id } = req.query;
    const hospital = await Hospital.findByIdAndDelete(id);
    
    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: 'Hospital not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Hospital deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update hospital
export const updateHospital = async (req, res) => {
  try {
    const { id } = req.query;
    const hospital = await Hospital.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: 'Hospital not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: hospital
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Add/update hospital details
export const updateHospitalDetails = async (req, res) => {
  try {
    const { id } = req.query;
    const hospital = await Hospital.findByIdAndUpdate(
      id,
      { 
        description: req.body.description,
        images: req.body.images,
        numberOfDoctors: req.body.numberOfDoctors,
        numberOfDepartments: req.body.numberOfDepartments
      },
      { new: true, runValidators: true }
    );
    
    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: 'Hospital not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: hospital
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get hospital by ID
export const getHospitalById = async (req, res) => {
  try {
    const { id } = req.query;
    const hospital = await Hospital.findById(id);
    
    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: 'Hospital not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: hospital
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};