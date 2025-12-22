import { APIProvider, Map, Marker, useMap } from '@vis.gl/react-google-maps';
import { useEffect } from 'react';

export interface Destination {
  _id?: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
}

interface MapComponentProps {
  destinations: Destination[];
  selectedDestination?: Destination | null;
  onMarkerClick?: (destination: Destination) => void;
  itineraryCoordinates?: Array<{ lat: number; lng: number; name: string }>;
}

// Center of Madhya Pradesh
const DEFAULT_CENTER = { lat: 23.2599, lng: 77.4126 };
const DEFAULT_ZOOM = 7;

const MapContent = ({ destinations, selectedDestination, onMarkerClick, itineraryCoordinates }: MapComponentProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Use itinerary coordinates if provided, otherwise use destinations
    const coordinates = itineraryCoordinates || destinations.map(d => ({
      lat: d.location.lat,
      lng: d.location.lng,
      name: d.name
    }));

    if (coordinates.length === 0) return;

    // Fit bounds to show all markers
    const fitBounds = () => {
      if (typeof window !== 'undefined' && (window as any).google?.maps) {
        const bounds = new (window as any).google.maps.LatLngBounds();
        coordinates.forEach((coord) => {
          bounds.extend({ lat: coord.lat, lng: coord.lng });
        });
        map.fitBounds(bounds);
      }
    };

    // Small delay to ensure map is fully initialized
    const timer = setTimeout(fitBounds, 100);
    return () => clearTimeout(timer);
  }, [map, destinations, itineraryCoordinates]);

  return (
    <>
      {/* Render destination markers */}
      {destinations.map((destination, index) => (
        <Marker
          key={destination._id || `dest-${index}`}
          position={{ lat: destination.location.lat, lng: destination.location.lng }}
          title={destination.name}
          onClick={() => onMarkerClick?.(destination)}
        />
      ))}
      
      {/* Render itinerary coordinate markers if provided */}
      {itineraryCoordinates && itineraryCoordinates.map((coord, index) => (
        <Marker
          key={`itinerary-${index}`}
          position={{ lat: coord.lat, lng: coord.lng }}
          title={coord.name}
        />
      ))}
    </>
  );
};

const MapComponent = ({ destinations, selectedDestination, onMarkerClick, itineraryCoordinates }: MapComponentProps) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="w-full h-[500px] bg-muted flex items-center justify-center rounded-lg border border-border">
        <div className="text-center p-6">
          <p className="text-muted-foreground mb-2">Google Maps API key not configured</p>
          <p className="text-sm text-muted-foreground">
            Please set VITE_GOOGLE_MAPS_API_KEY in your .env file
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden border border-border">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={DEFAULT_CENTER}
          defaultZoom={DEFAULT_ZOOM}
          mapId="mp-tourism-map"
          fullscreenControl={true}
          zoomControl={true}
          streetViewControl={false}
          mapTypeControl={true}
          style={{ width: '100%', height: '100%' }}
        >
          <MapContent
            destinations={destinations}
            selectedDestination={selectedDestination}
            onMarkerClick={onMarkerClick}
            itineraryCoordinates={itineraryCoordinates}
          />
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapComponent;

