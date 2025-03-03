"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Building2, Menu, X, Search, User, ChevronDown } from "lucide-react"
import { Button } from "../components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "../components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"

export default function Navbar() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)

  // Add scroll event listener
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    })
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hospitals", path: "/hospitals" },
    { name: "Add Hospital", path: "/hospitals/create" },
  ]

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-md text-foreground"
          : "bg-primary text-primary-foreground"
      }`}
    >
      <div className="container px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-7 w-7" />
            <span className="text-xl font-bold">MediCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? isScrolled
                      ? "bg-muted text-foreground"
                      : "bg-primary-foreground/10 text-primary-foreground"
                    : "hover:bg-primary-foreground/10"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center py-4 border-b">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-6 w-6" />
                    <span className="font-bold">MediCare</span>
                  </div>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetClose>
                </div>

                <nav className="flex flex-col space-y-1 py-4">
                  {navLinks.map((link) => (
                    <SheetClose key={link.path} asChild>
                      <Link
                        to={link.path}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive(link.path) ? "bg-muted" : "hover:bg-muted"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

