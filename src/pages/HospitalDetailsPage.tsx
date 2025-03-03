import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Star, Stethoscope, Building2, Edit, Trash2, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '../components/ui/button';
import { API_URL } from '../services/api';
interface Hospital {
  _id: string;
  name: string;
  city: string;
  image: string;
  speciality: string[];
  rating: number;
  description: string;
  images: string[];
  numberOfDoctors: number;
  numberOfDepartments: number;
  imageUrl: string;
}
const HospitalDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  useEffect(() => {
    if (id) {
      fetchHospitalDetails(id);
    }
  }, [id]);
  const fetchHospitalDetails = async (hospitalId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/hospitals/details?id=${hospitalId}`);
      setHospital(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching hospital details:', error);
      toast.error('Failed to fetch hospital details');
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/hospitals/delete?id=${id}`);
      toast.success('Hospital deleted successfully');
      navigate('/hospitals');
    } catch (error) {
      console.error('Error deleting hospital:', error);
      toast.error('Failed to delete hospital');
    }
    setShowDeleteModal(false);
  };
  // Render star rating
  const renderRating = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (!hospital) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertTriangle className="h-16 w-16 mx-auto text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Hospital Not Found</h2>
        <p className="text-gray-600 mb-6">The hospital you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/hospitals" 
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Back to Hospitals
        </Link>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{hospital.name}</h1>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-1" />
            <span>{hospital.city}</span>
          </div>
        </div>
        <div className="flex mt-4 md:mt-0 space-x-3">
          <Link 
            to={`/hospitals/edit/${hospital._id}`} 
            className="flex items-center bg-black text-white py-1.5 px-4 rounded-md"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Link>
          <Button 
            onClick={() => setShowDeleteModal(true)} 
            className="flex items-center bg-black text-white"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column - Main Image and Info */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <img 
              src={hospital.imageUrl} 
              alt={hospital.name}
              className="w-full h-80 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80";
              }}
            />
            <div className="p-6">
              <div className="flex items-center mb-4">
                {renderRating(hospital.rating)}
                <span className="ml-2 text-gray-600">{hospital.rating.toFixed(1)}/5</span>
              </div>
              
              <h2 className="text-xl font-semibold mb-3">About</h2>
              <p className="text-gray-700 mb-6">{hospital.description}</p>
              
              <h2 className="text-xl font-semibold mb-3">Specialities</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {hospital.speciality.map((spec, index) => (
                  <span 
                    key={index} 
                    className="bg-black text-white px-3 py-1 rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
              
              {hospital.images && hospital.images.length > 0 && (
                <>
                  <h2 className="text-xl font-semibold mb-3">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {hospital.images.map((img, index) => (
                      <img 
                        key={index} 
                        src={img} 
                        alt={`${hospital.name} - ${index + 1}`}
                        className="rounded-md h-32 w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80";
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Right Column - Stats and Additional Info */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Hospital Stats</h2>
            
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <Stethoscope className="h-5 w-5 text-black mr-3" />
                <span className="text-gray-700">Doctors</span>
              </div>
              <span className="font-semibold">{hospital.numberOfDoctors}</span>
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Building2 className="h-5 w-5 text-black mr-3" />
                <span className="text-gray-700">Departments</span>
              </div>
              <span className="font-semibold">{hospital.numberOfDepartments}</span>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-2">
              For appointments and inquiries, please contact the hospital directly.
            </p>
            <Button className="w-full bg-black text-white py-2 rounded-md mt-4">
              Get Directions
            </Button>
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center text-red-600 mb-4">
              <AlertTriangle className="h-6 w-6 mr-2" />
              <h3 className="text-xl font-bold">Confirm Deletion</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete <span className="font-semibold">{hospital.name}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button 
                onClick={() => setShowDeleteModal(false)} 
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleDelete} 
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default HospitalDetailsPage;