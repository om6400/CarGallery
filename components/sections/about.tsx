import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Camera, Mail } from "lucide-react";

export default function About() {
  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About CarVisuals</h2>
          <div className="w-20 h-1 bg-primary mx-auto my-6"></div>
        </div>
        
        <div className="space-y-8 text-center md:text-left">
          <p className="text-lg">
            CarVisuals is a carefully curated gallery of automotive photography, bringing together the most stunning 
            images of vehicles from around the world. Our mission is to showcase the perfect blend of engineering 
            and artistry that automobiles represent.
          </p>
          
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-4">Credits & Acknowledgements</h3>
            <p>
              We feature work from talented photographers and digital artists worldwide. All images are credited to their 
              respective creators when available. For AI-generated content, we use cutting-edge models while respecting 
              original styles and concepts.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-4">Get In Touch</h3>
            <p className="mb-6">
              Have questions, suggestions, or want to contribute your work to our gallery? 
              We'd love to hear from you!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/contact">
                <Button className="rounded-full w-full sm:w-auto">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Us
                </Button>
              </Link>
              
              <Link href="/contribute">
                <Button variant="outline" className="rounded-full w-full sm:w-auto">
                  <Camera className="mr-2 h-4 w-4" />
                  Submit Your Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}