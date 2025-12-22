import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { itineraryService } from "@/services/api";

interface ItineraryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onItineraryGenerated: (itinerary: any) => void;
}

interface ItineraryPreferences {
  duration: string;
  interests: string;
  budget: string;
  travelStyle: string;
  preferences: string;
}

const ItineraryModal = ({ open, onOpenChange, onItineraryGenerated }: ItineraryModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ItineraryPreferences>({
    duration: "",
    interests: "",
    budget: "",
    travelStyle: "",
    preferences: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const itinerary = await itineraryService.generate(formData);
      onItineraryGenerated(itinerary);
      onOpenChange(false);
    } catch (error) {
      console.error("Error generating itinerary:", error);
      alert("Failed to generate itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-bold text-foreground">
            AI-Powered Itinerary Generator
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Tell us your preferences and we'll create a personalized travel plan for Madhya Pradesh
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Days</Label>
            <Select
              value={formData.duration}
              onValueChange={(value) => setFormData({ ...formData, duration: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select number of days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2">1-2 Days</SelectItem>
                <SelectItem value="3-4">3-4 Days</SelectItem>
                <SelectItem value="5-7">5-7 Days</SelectItem>
                <SelectItem value="8+">8+ Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget</Label>
            <Select
              value={formData.budget}
              onValueChange={(value) => setFormData({ ...formData, budget: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget (₹5,000 - ₹15,000)</SelectItem>
                <SelectItem value="mid">Mid-range (₹15,000 - ₹30,000)</SelectItem>
                <SelectItem value="luxury">Luxury (₹30,000+)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests">Interests</Label>
            <Select
              value={formData.interests}
              onValueChange={(value) => setFormData({ ...formData, interests: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your interests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wildlife">Wildlife & Nature</SelectItem>
                <SelectItem value="heritage">Heritage & Culture</SelectItem>
                <SelectItem value="tribal">Tribal Experiences</SelectItem>
                <SelectItem value="adventure">Adventure & Outdoor</SelectItem>
                <SelectItem value="mixed">Mixed Experience</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="travelStyle">Travel Style (Optional)</Label>
            <Select
              value={formData.travelStyle}
              onValueChange={(value) => setFormData({ ...formData, travelStyle: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select travel style (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relaxed">Relaxed & Leisurely</SelectItem>
                <SelectItem value="moderate">Moderate Pace</SelectItem>
                <SelectItem value="fast">Fast-paced & Active</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferences">Additional Preferences (Optional)</Label>
            <Textarea
              id="preferences"
              placeholder="Any specific places you want to visit, dietary requirements, accessibility needs, etc."
              value={formData.preferences}
              onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="flex gap-4 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-forest hover:bg-forest/90">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Itinerary"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ItineraryModal;

