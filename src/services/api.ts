import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Hospital APIs
export const hospitalApi = {
  // Get all hospitals or filter by city
  getHospitals: (city?: string) => {
    const url = city ? `/hospitals?city=${city}` : '/hospitals';
    return api.get(url);
  },
  
  // Get hospital by ID
  getHospitalById: (id: string) => {
    return api.get(`/hospitals/details?id=${id}`);
  },
  
  // Create new hospital
  createHospital: (hospitalData: any) => {
    return api.post('/hospitals/create', hospitalData);
  },
  
  // Update hospital
  updateHospital: (id: string, hospitalData: any) => {
    return api.put(`/hospitals/update?id=${id}`, hospitalData);
  },
  
  // Update hospital details
  updateHospitalDetails: (id: string, detailsData: any) => {
    return api.post(`/hospitals/details?id=${id}`, detailsData);
  },
  
  // Delete hospital
  deleteHospital: (id: string) => {
    return api.delete(`/hospitals/delete?id=${id}`);
  },
  
  // Upload image
  uploadImage: (formData: FormData) => {
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;