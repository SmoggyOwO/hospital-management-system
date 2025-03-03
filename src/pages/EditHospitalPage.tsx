import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Save, AlertCircle, Loader } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { API_URL } from '../services/api';

interface FormData {
  name: string;
  city: string;
  speciality: string[];
  rating: number;
  description: string;
  numberOfDoctors: number;
  numberOfDepartments: number;
  imageUrl: string;
}

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
}

const specialityOptions = [
  'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology',
  'Gynecology', 'Dermatology', 'Ophthalmology', 'Psychiatry', 'Urology',
  'Endocrinology', 'Gastroenterology', 'Pulmonology', 'Nephrology', 'Rheumatology'
];

const EditHospitalPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      fetchHospitalDetails(id);
    }
  }, [id]);

  const fetchHospitalDetails = async (hospitalId: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/hospitals/details?id=${hospitalId}`);
      const hospitalData = response.data.data;
      
      setHospital(hospitalData);
      setSelectedSpecialities(hospitalData.speciality);
      setImageUrl(hospitalData.image);
      
      reset({
        name: hospitalData.name,
        city: hospitalData.city,
        rating: hospitalData.rating,
        description: hospitalData.description,
        numberOfDoctors: hospitalData.numberOfDoctors,
        numberOfDepartments: hospitalData.numberOfDepartments,
        imageUrl: hospitalData.image
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching hospital details:', error);
      toast.error('Failed to fetch hospital details');
      setIsLoading(false);
      navigate('/hospitals');
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const toggleSpeciality = (speciality: string) => {
    if (selectedSpecialities.includes(speciality)) {
      setSelectedSpecialities(selectedSpecialities.filter(s => s !== speciality));
    } else {
      setSelectedSpecialities([...selectedSpecialities, speciality]);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!imageUrl) {
      toast.error('Please provide a hospital image URL');
      return;
    }

    if (selectedSpecialities.length === 0) {
      toast.error('Please select at least one speciality');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Update hospital data with image URL
      const hospitalData = {
        ...data,
        speciality: selectedSpecialities,
        image: imageUrl
      };
      
      await axios.put(`${API_URL}/hospitals/update?id=${id}`, hospitalData);
      
      toast.success('Hospital updated successfully');
      navigate(`/hospitals/${id}`);
    } catch (error) {
      console.error('Error updating hospital:', error);
      toast.error('Failed to update hospital');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertCircle className="h-16 w-16 mx-auto text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Hospital Not Found</h2>
        <p className="text-gray-600 mb-6">The hospital you're trying to edit doesn't exist or has been removed.</p>
        <Button 
          onClick={() => navigate('/hospitals')}
        >
          Back to Hospitals
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Hospital</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Hospital Name*
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter hospital name"
                  {...register('name', { required: 'Hospital name is required' })}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.name.message}
                  </p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City*
                </label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Enter city name"
                  {...register('city', { required: 'City is required' })}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.city.message}
                  </p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (1-5)*
                </label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  {...register('rating', { 
                    required: 'Rating is required',
                    min: { value: 1, message: 'Rating must be at least 1' },
                    max: { value: 5, message: 'Rating cannot exceed 5' }
                  })}
                />
                {errors.rating && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.rating.message}
                  </p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Hospital Image URL*
                </label>
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="Enter image URL"
                  value={imageUrl}
                  {...register('imageUrl', { 
                    required: 'Image URL is required',
                    onChange: handleImageUrlChange
                  })}
                />
                {errors.imageUrl && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.imageUrl.message}
                  </p>
                )}
                
                {imageUrl && (
                  <div className="mt-3 border rounded-md p-2">
                    <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                    <img
                      src={imageUrl}
                      alt="Hospital preview"
                      className="h-32 object-cover rounded-md"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                        toast.error('Image URL is invalid or inaccessible');
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Column */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialities*
                </label>
                <div className="border border-gray-300 rounded-md p-3 h-40 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-2">
                    {specialityOptions.map((speciality) => (
                      <div key={speciality} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`speciality-${speciality}`}
                          checked={selectedSpecialities.includes(speciality)}
                          onChange={() => toggleSpeciality(speciality)}
                          className='accent-black'
                        />
                        <label
                          htmlFor={`speciality-${speciality}`}
                          className="ml-2 block text-sm text-gray-700"
                        >
                          {speciality}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {selectedSpecialities.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedSpecialities.map((speciality) => (
                      <span
                        key={speciality}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white"
                      >
                        {speciality}
                        <button
                          type="button"
                          className='p-1'
                          onClick={() => toggleSpeciality(speciality)}
                        >
                          <AlertCircle className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description*
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className={`w-full px-4 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter hospital description"
                  {...register('description', { required: 'Description is required' })}
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.description.message}
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="numberOfDoctors" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Doctors*
                  </label>
                  <Input
                    id="numberOfDoctors"
                    type="number"
                    min="0"
                    {...register('numberOfDoctors', { 
                      required: 'Number of doctors is required',
                      min: { value: 0, message: 'Cannot be negative' }
                    })}
                  />
                  {errors.numberOfDoctors && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.numberOfDoctors.message}
                    </p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="numberOfDepartments" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Departments*
                  </label>
                  <Input
                    id="numberOfDepartments"
                    type="number"
                    min="0"
                    {...register('numberOfDepartments', { 
                      required: 'Number of departments is required',
                      min: { value: 0, message: 'Cannot be negative' }
                    })}
                  />
                  {errors.numberOfDepartments && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.numberOfDepartments.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button
              type="button"
              onClick={() => navigate(`/hospitals/${id}`)}
              className='mr-2'
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Update Hospital
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHospitalPage;