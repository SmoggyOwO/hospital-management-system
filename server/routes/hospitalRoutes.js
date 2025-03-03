import express from 'express';
import {
  createHospital,
  getHospitalsByCity,
  deleteHospital,
  updateHospital,
  updateHospitalDetails,
  getHospitalById
} from '../controllers/hospitalController.js';

const router = express.Router();

// Create new hospital
router.post('/create', createHospital);

// Get hospitals by city
router.get('/', getHospitalsByCity);

// Delete hospital
router.delete('/delete', deleteHospital);

// Update hospital
router.put('/update', updateHospital);

// Add/update hospital details
router.post('/details', updateHospitalDetails);

// Get hospital by ID
router.get('/details', getHospitalById);

export default router;