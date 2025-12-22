import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  Camera,
} from "lucide-react";
import { destinationService, Destination } from "@/services/api";
import MapComponent from "@/components/MapComponent";

// Image mapping for static imports
import kanhaImage from "@/assets/kanha-tiger.jpg";
import khajurahoImage from "@/assets/khajuraho.jpg";
import pachmarhiImage from "@/assets/pachmarhi.jpg";
import sanchiImage from "@/assets/sanchi.jpg";
import orchhaImage from "@/assets/orchha.jpg";
import manduImage from "@/assets/mandu.jpg";
import satpuraImage from "@/assets/satpura.jpg";
import BandhavgarhImage from "@/assets/Bandhavgarh.jpg";
import GondImage from "@/assets/Gond.jpg";
import BhilImage from "@/assets/Bhil.jpg";
import BaigaImage from "@/assets/Baiga.jpg";
import BhedaghatImage from "@/assets/Bhedaghat.jpg";
import DhuandharImage from "@/assets/Dhuandhar.jpg";
import PannaImage from "@/assets/Panna.jpg";

const imageMap: Record<string, string> = {
  "kanha-national-park": kanhaImage,
  "khajuraho-temples": khajurahoImage,
  "pachmarhi": pachmarhiImage,
  "sanchi-stupa": sanchiImage,
  "orchha": orchhaImage,
  "mandu": manduImage,
  "satpura-national-park": satpuraImage,
  "bandhavgarh-national-park": BandhavgarhImage,
  "gond-villages": GondImage,
  "bhil-communities": BhilImage,
  "baiga-tribes": BaigaImage,
  "bhedaghat": BhedaghatImage,
  "dhuandhar-falls": DhuandharImage,
  "panna-national-park": PannaImage,
};

const PlaceDetail = () => {
  const { placeId } = useParams();
  const [place, setPlace] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlace = async () => {
      if (!placeId) {
        setError("Place ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await destinationService.getBySlug(placeId);
        setPlace(data);
      } catch (err: any) {
        console.error("Error fetching place:", err);
        setError(err.response?.status === 404 ? "Place not found" : "Failed to load place details");
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [placeId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-muted-foreground">Loading place details...</p>
        </div>
      </div>
    );
  }

  if (error || !place) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">
            {error || "Place not found"}
          </h1>
          <Button asChild>
            <Link to="/explore">Back to Explore</Link>
          </Button>
        </div>
      </div>
    );
  }

  const imageSrc = imageMap[place.slug] || place.image;

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px]">
        <img
          src={imageSrc}
          alt={place.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/40 to-transparent" />
        <div className="container-custom relative h-full flex flex-col justify-end pb-12 text-primary-foreground">
          <Button
            variant="hero-outline"
            size="sm"
            className="w-fit mb-6"
            asChild
          >
            <Link to="/explore">
              <ArrowLeft className="w-4 h-4" />
              Back to Explore
            </Link>
          </Button>
          <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-sm font-medium rounded-full w-fit mb-4">
            {place.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {place.name}
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            {place.description}
          </p>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-forest" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Best Time</p>
                <p className="font-medium text-foreground">{place.bestTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-forest" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium text-foreground">{place.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-forest" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium text-foreground">{place.location.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-forest" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Local Guides</p>
                <p className="font-medium text-foreground">Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  About
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {place.fullDescription}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  Highlights
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {place.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-center gap-3 p-4 bg-muted rounded-xl"
                    >
                      <Camera className="w-5 h-5 text-forest" />
                      <span className="font-medium text-foreground">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  Location on Map
                </h2>
                <MapComponent
                  destinations={[place]}
                  selectedDestination={place}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Eco & Cultural Guidelines
                  </h3>
                </div>

                <ul className="space-y-3">
                  {place.guidelines.map((guideline, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="w-5 h-5 bg-forest/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 bg-forest rounded-full" />
                      </span>
                      {guideline}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-forest rounded-2xl p-6 text-primary-foreground">
                <h3 className="font-display text-lg font-semibold mb-3">
                  Plan Your Visit
                </h3>
                <p className="text-sm text-primary-foreground/80 mb-4">
                  This is a concept platform. Real booking features coming soon.
                </p>
                <Button variant="hero" className="w-full">
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PlaceDetail;
