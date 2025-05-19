"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  Compass, 
  Monitor, 
  Car, 
  Search, 
  Menu, 
  X 
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: <Camera className="w-4 h-4 mr-2" />,
  },
  {
    label: "Explore",
    href: "/explore",
    icon: <Compass className="w-4 h-4 mr-2" />,
  },
  {
    label: "Wallpapers",
    href: "/wallpapers",
    icon: <Monitor className="w-4 h-4 mr-2" />,
  },
  {
    label: "Garage",
    href: "/garage",
    icon: <Car className="w-4 h-4 mr-2" />,
  },
];

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Only run after mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update header background on scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <header className="fixed top-0 w-full z-50 py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight">
              Car<span className="text-primary">Visuals</span>
            </span>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out py-4 px-4 md:px-8",
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold tracking-tight">
            Car<span className="text-primary">Visuals</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center text-sm font-medium hover:text-primary transition-colors"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <Link href="/search">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden space-x-2">
          <ThemeToggle />
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px]">
              <div className="flex flex-col h-full py-4">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xl font-bold">CarVisuals</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex flex-col space-y-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsSheetOpen(false)}
                      className="flex items-center text-base font-medium hover:text-primary transition-colors"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/search"
                    onClick={() => setIsSheetOpen(false)}
                    className="flex items-center text-base font-medium hover:text-primary transition-colors"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}