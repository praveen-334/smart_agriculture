import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spline from '@splinetool/react-spline';

export default function Chatbot() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-60 bg-background/80 backdrop-blur-sm border border-border shadow-lg hover:bg-accent"
      >
        <X className="h-5 w-5" />
      </Button>

      {/* 3D Spline Element */}
      <div className="w-full h-full">
        <Spline scene="https://prod.spline.design/lkq8dyM-rny5J147/scene.splinecode" />
      </div>
    </div>
  );
}