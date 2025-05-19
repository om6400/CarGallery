import Link from "next/link";
import { ChevronRight, Instagram, Twitter, Youtube, Facebook, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted w-full py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">CarVisuals</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              The premier destination for automotive photography and wallpapers.
              Showcasing the world's most beautiful machines through the lens of art.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </Link>
              <Link 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Navigation</h3>
            <ul className="space-y-3">
              {["Home", "Explore", "Wallpapers", "Garage"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item === 'Home' ? '' : item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary flex items-center transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 mr-1" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Information</h3>
            <ul className="space-y-3">
              {["About", "Privacy Policy", "Terms", "Contact"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-muted-foreground hover:text-primary flex items-center transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 mr-1" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} CarVisuals. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm mt-4 md:mt-0 flex items-center">
            Built with <Heart className="w-4 h-4 text-red-500 mx-1" /> using 
            <span className="font-medium ml-1">Next.js + Tailwind</span>
          </p>
        </div>
      </div>
    </footer>
  );
}