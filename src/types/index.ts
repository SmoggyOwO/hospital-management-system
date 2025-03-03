export interface Hospital {
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
  createdAt: string;
  updatedAt: string;
}

export interface HospitalFormData {
  name: string;
  city: string;
  speciality: string[];
  rating: number;
  description: string;
  numberOfDoctors: number;
  numberOfDepartments: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
}