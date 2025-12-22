import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MapComponent from "@/components/MapComponent";
import { destinationService, Destination, ItineraryResponse } from "@/services/api";
import { Loader2 } from "lucide-react";

const MapPage = () => {
  const location = useLocation();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [itinerary, setItinerary] = useState<ItineraryResponse['data'] | null>(null);

  useEffect(() => {
    // Check if itinerary data was passed via navigation state
    if (location.state?.itinerary) {
      setItinerary(location.state.itinerary);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await destinationService.getAll();
        setDestinations(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Extract coordinates from itinerary if available
  const itineraryCoordinates = itinerary?.days.flatMap(day =>
    day.activities.map(activity => ({
      lat: activity.location.lat,
      lng: activity.location.lng,
      name: activity.name
    }))
  ) || undefined;

  if (loading) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-forest" />
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20">
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="max-w-3xl mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Interactive Maps
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore all destinations in Madhya Pradesh on an interactive map. Click on markers to learn more about each location.
            </p>
          </div>

          {itinerary && (
            <div className="mb-6 p-6 bg-forest/5 border border-forest/20 rounded-2xl">
              <h2 className="text-xl font-display font-bold text-foreground mb-2">Your Itinerary</h2>
              <p className="text-muted-foreground mb-4">{itinerary.summary}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                {itinerary.days.map((day) => (
                  <div key={day.day} className="bg-card p-4 rounded-lg border border-border">
                    <h3 className="font-semibold text-foreground mb-2">{day.date}</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      {day.activities.slice(0, 3).map((activity, idx) => (
                        <li key={idx}>• {activity.name}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <MapComponent
              destinations={itinerary ? [] : destinations}
              selectedDestination={selectedDestination}
              onMarkerClick={setSelectedDestination}
              itineraryCoordinates={itineraryCoordinates}
            />
          </div>

          {selectedDestination && (
            <div className="mt-6 p-6 bg-card border border-border rounded-2xl">
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                {selectedDestination.name}
              </h2>
              <p className="text-muted-foreground mb-4">{selectedDestination.description}</p>
              <div className="flex gap-4 text-sm">
                <span className="text-forest font-medium">{selectedDestination.category}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{selectedDestination.location.address}</span>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default MapPage;

