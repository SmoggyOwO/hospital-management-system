"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, MapPin, Star, Stethoscope, Building2 } from "lucide-react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Skeleton } from "../components/ui/skeleton"

interface Hospital {
  _id: string
  name: string
  city: string
  image: string
  speciality: string[]
  rating: number
  numberOfDoctors: number
  numberOfDepartments: number
}

export default function HospitalListPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([])
  const [loading, setLoading] = useState(true)
  const [searchCity, setSearchCity] = useState("")
  const [searchSpeciality, setSearchSpeciality] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    fetchHospitals()
  }, [])

  const fetchHospitals = async () => {
    try {
      setLoading(true)
      const response = await axios.get("http://localhost:5000/api/v1/hospitals")
      setHospitals(response.data.data)
      setFilteredHospitals(response.data.data)
    } catch (error) {
      console.error("Error fetching hospitals:", error)
      toast.error("Failed to fetch hospitals")
    } finally {
      setLoading(false)
    }
  }

  const handleCitySearch = async () => {
    if (!searchCity.trim()) return

    try {
      setIsSearching(true)
      const response = await axios.get(`http://localhost:5000/api/v1/hospitals?city=${searchCity}`)
      setFilteredHospitals(response.data.data)
      if (response.data.data.length === 0) {
        toast.error("No hospitals found in this city")
      }
    } catch (error) {
      console.error("Error searching hospitals:", error)
      toast.error("Failed to search hospitals")
    } finally {
      setIsSearching(false)
    }
  }

  const handleSpecialityFilter = () => {
    if (!searchSpeciality) {
      setFilteredHospitals(hospitals)
      return
    }

    const filtered = hospitals.filter((hospital) =>
      hospital.speciality.some((spec) => spec.toLowerCase().includes(searchSpeciality.toLowerCase())),
    )
    setFilteredHospitals(filtered)
    if (filtered.length === 0) {
      toast.error("No hospitals found with this speciality")
    }
  }

  const handleReset = () => {
    setSearchCity("")
    setSearchSpeciality("")
    setFilteredHospitals(hospitals)
  }

  const renderRating = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${index < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/25"}`}
        />
      ))
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hospitals Directory</h1>
          <p className="text-muted-foreground mt-1">Find and explore hospitals in your area</p>
        </div>
        <Button asChild>
          <Link to="/hospitals/create">Add New Hospital</Link>
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="citySearch" className="text-sm font-medium">
                Search by City
              </label>
              <div className="flex gap-2">
                <Input
                  id="citySearch"
                  placeholder="Enter city name"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  onKeyUp={(e) => e.key === "Enter" && handleCitySearch()}
                />
                <Button variant="secondary" size="icon" onClick={handleCitySearch} disabled={isSearching}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="specialityFilter" className="text-sm font-medium">
                Filter by Speciality
              </label>
              <Input
                id="specialityFilter"
                placeholder="e.g. Cardiology, Pediatrics"
                value={searchSpeciality}
                onChange={(e) => {
                  setSearchSpeciality(e.target.value)
                  if (e.target.value === "") {
                    setFilteredHospitals(hospitals)
                  }
                }}
                onKeyUp={(e) => e.key === "Enter" && handleSpecialityFilter()}
              />
            </div>

            <div className="flex items-end gap-2">
              <Button variant="default" onClick={handleSpecialityFilter} className="flex-1">
                Apply Filters
              </Button>
              <Button variant="outline" onClick={handleReset} className="flex-1">
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hospital List */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 rounded-none" />
                <CardHeader className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
        </div>
      ) : filteredHospitals.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <Building2 className="h-16 w-16 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold">No Hospitals Found</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Try adjusting your search criteria or add a new hospital to our directory.
            </p>
            <Button asChild className="mt-4">
              <Link to="/hospitals/create">Add New Hospital</Link>
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital) => (
            <Card key={hospital._id} className="overflow-hidden transition-all hover:shadow-lg group">
              <div className="relative aspect-video">
                <img
                  src={hospital.image.startsWith("http") ? hospital.image : `http://localhost:5000${hospital.image}`}
                  alt={hospital.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src =
                      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  }}
                />
                <div className="absolute top-2 right-2 flex gap-1">{renderRating(hospital.rating)}</div>
              </div>

              <CardHeader>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">{hospital.name}</h2>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1 shrink-0" />
                    <span className="truncate">{hospital.city}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {hospital.speciality.slice(0, 3).map((spec, index) => (
                    <Badge key={index} variant="secondary" className="rounded-full">
                      {spec}
                    </Badge>
                  ))}
                  {hospital.speciality.length > 3 && (
                    <Badge variant="outline" className="rounded-full">
                      +{hospital.speciality.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Stethoscope className="h-4 w-4" />
                    <span>{hospital.numberOfDoctors} Doctors</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    <span>{hospital.numberOfDepartments} Departments</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={`/hospitals/${hospital._id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

