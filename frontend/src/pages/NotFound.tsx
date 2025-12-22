import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-cream pt-20">
      <div className="container-custom">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-5xl font-display font-bold text-forest">404</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="nature" asChild>
              <Link to="/">
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/explore">
                <ArrowLeft className="w-4 h-4" />
                Explore MP
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
