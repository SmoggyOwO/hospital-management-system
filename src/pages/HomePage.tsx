import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, PlusCircle, Building2, Users, ArrowRight, ChevronRight } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground py-24 md:py-32">
        <div 
          className={`container px-4 text-center space-y-8 transition-all duration-700 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Badge variant="outline" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 px-4 py-1.5 text-sm font-medium">
            Healthcare Management
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Hospital Management System
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-2xl mx-auto">
            A comprehensive solution for managing hospitals, doctors, and healthcare services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button 
              asChild
              size="lg"
              variant="secondary"
              className="font-medium text-base"
            >
              <Link to="/hospitals">
                View Hospitals
              </Link>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground font-medium text-base"
            >
              <Link to="/hospitals/create">
                Add New Hospital <PlusCircle className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[30%] -right-[10%] h-[500px] w-[500px] rounded-full bg-primary-foreground/5 blur-3xl"></div>
          <div className="absolute -bottom-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-primary-foreground/5 blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Key Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to manage healthcare facilities efficiently
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center pb-2">
                <div className="bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Find Hospitals</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Search and filter hospitals by city, speciality, and ratings to find the perfect match for your healthcare needs.
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center pb-2">
                <div className="bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <PlusCircle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Add New Hospitals</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Easily add new hospitals to the system with comprehensive details including specialities and departments.
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center pb-2">
                <div className="bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Manage Hospital Data</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Update hospital information, add images, and manage specialities with our intuitive management interface.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none bg-background/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <h4 className="text-5xl font-bold text-primary mb-2">500+</h4>
                <p className="text-muted-foreground text-lg">Hospitals Registered</p>
              </CardContent>
            </Card>
            
            <Card className="border-none bg-background/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <h4 className="text-5xl font-bold text-primary mb-2">50+</h4>
                <p className="text-muted-foreground text-lg">Cities Covered</p>
              </CardContent>
            </Card>
            
            <Card className="border-none bg-background/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <h4 className="text-5xl font-bold text-primary mb-2">10,000+</h4>
                <p className="text-muted-foreground text-lg">Healthcare Professionals</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container px-4">
          <Card className="border-none bg-gradient-to-r from-primary/10 to-primary/5 shadow-xl">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to Get Started?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join our platform to manage your hospital data efficiently and connect with patients.
              </p>
              <div className="pt-4">
                <Button 
                  asChild
                  size="lg"
                  className="font-medium text-base group"
                >
                  <Link to="/hospitals/create">
                    Add Your Hospital
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Dark mode toggle */}
      <div className="fixed bottom-4 right-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full shadow-md"
          onClick={() => document.documentElement.classList.toggle('dark')}
        >
          <span className="sr-only">Toggle dark mode</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </Button>
      </div>
    </div>
  )
}
