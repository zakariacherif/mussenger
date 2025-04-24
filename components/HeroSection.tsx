'use client'
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import hero from "@/pics/hero.jpg"
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  return (
    <div className="relative min-h-screen flex items-start pt-20 justify-start  overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center"
  style={{ backgroundImage: `url(${hero.src})` }}  />
      
      {/* Overlay */}

      {/* Content */}
      <div className="relative container mx-auto flex flex-col items-center justify-start px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-up">
          Mussenger
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-up">
          A secure digital space for Muslims to chat privatly
        </p>
        <Button 
          size="lg" 
          onClick={() => router.push('/chat')}
          className="bg-white text-primary hover:bg-white/90 animate-fade-up cursor-pointer"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          Join Our Community
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;