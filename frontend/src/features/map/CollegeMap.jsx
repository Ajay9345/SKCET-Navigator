import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const mapContainerStyle = { height: "80vh", width: "100%" };
const defaultCenter = { lat: 11.0168, lng: 77.0025 };
const API_BASE_FALLBACK = "http://localhost:5000";

const fetchJsonWithFallback = async (path) => {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Primary request failed: ${res.status}`);
    return await res.json();
  } catch {
    const fallbackRes = await fetch(`${API_BASE_FALLBACK}${path}`);
    if (!fallbackRes.ok) {
      throw new Error(`Fallback request failed: ${fallbackRes.status}`);
    }
    return await fallbackRes.json();
  }
};

const stripHtml = (value) =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function CollegeMapCanvas({ mapKey, locations }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "college-map-script",
    googleMapsApiKey: mapKey,
    libraries: ["places"],
  });

  const [userLocation, setUserLocation] = useState(null);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [voiceInstructions, setVoiceInstructions] = useState("");
  const intervalRef = useRef(null);

  const locationNames = useMemo(() => Object.keys(locations), [locations]);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) =>
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      (error) => console.error("Error fetching location:", error),
      { enableHighAccuracy: true },
    );
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      window.speechSynthesis.cancel();
    };
  }, []);

  const startNavigation = (directionsResult) => {
    const steps = directionsResult?.routes?.[0]?.legs?.[0]?.steps || [];
    if (steps.length === 0) return;

    clearInterval(intervalRef.current);
    let currentStep = 0;
    const speak = (text) =>
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));

    const updateStep = () => {
      if (currentStep < steps.length) {
        const instruction = stripHtml(
          steps[currentStep].instructions || "Continue",
        );
        setVoiceInstructions(instruction);
        speak(instruction);
        currentStep += 1;
      } else {
        clearInterval(intervalRef.current);
        setIsNavigating(false);
        speak("You have reached your destination.");
      }
    };

    updateStep();
    intervalRef.current = setInterval(updateStep, 5000);
  };

  const updateRoute = (shouldStartNavigation = false) => {
    if (!source || !destination) return;

    const srcCoords =
      source === "Current Location" ? userLocation : locations[source]?.coords;
    const destCoords = locations[destination]?.coords;
    if (!srcCoords || !destCoords || !window.google?.maps) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: srcCoords,
        destination: destCoords,
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          if (shouldStartNavigation || isNavigating) startNavigation(result);
        } else {
          console.error("Error fetching directions:", status);
        }
      },
    );
  };

  const handleStartNavigation = () => {
    setIsNavigating(true);
    updateRoute(true);
  };

  const handleStopNavigation = () => {
    setIsNavigating(false);
    clearInterval(intervalRef.current);
    setVoiceInstructions("");
    window.speechSynthesis.cancel();
  };

  if (loadError) {
    return (
      <div className="flex justify-center items-center h-screen p-6 text-red-400 bg-[#060d1f]">
        Unable to load Google Maps. Check API key and disable blockers for
        maps.googleapis.com/maps.gstatic.com.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#060d1f]">
        <p className="text-lg text-white/70 font-medium">Loading Maps...</p>
      </div>
    );
  }

  const buttonBaseClass =
    "relative overflow-hidden px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 border border-white/10";
  const buttonRipple =
    "after:content-[''] after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-white/20 after:scale-0 hover:after:scale-100 after:transition-transform after:duration-300 after:origin-center";

  return (
    <div className="min-h-screen bg-[#060d1f] dot-pattern font-sans text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="w-full mb-6 flex items-center gap-4">
          <Link
            to="/home"
            className="text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1
              className="text-white font-bold text-2xl"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              College Navigation
            </h1>
            <p className="text-white/35 text-sm mt-0.5">
              Voice-enabled campus route guidance
            </p>
          </div>
        </div>

        <div className="glass rounded-2xl p-4 md:p-5 border border-white/10 mb-5">
          <div className="flex flex-wrap gap-3 justify-center items-end">
            <button
              onClick={() => userLocation && setSource("Current Location")}
              disabled={!userLocation}
              className={`${buttonBaseClass} ${buttonRipple} transform hover:-translate-y-1 active:translate-y-0 ${
                !userLocation
                  ? "bg-white/10 cursor-not-allowed text-white/40"
                  : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/30"
              }`}
            >
              Use My Current Location
            </button>

            <div className="flex flex-col min-w-[240px] group">
              <label
                htmlFor="source-select"
                className="mb-2 text-sm font-medium text-blue-300"
              >
                Source:
              </label>
              <div className="relative">
                <select
                  id="source-select"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0d1a35] rounded-xl appearance-none cursor-pointer border border-white/15 text-white transition-all duration-300 hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                >
                  <option value="">Select Source</option>
                  <option value="Current Location">Current Location</option>
                  {locationNames.map((place) => (
                    <option key={place} value={place}>
                      {place}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                  ▼
                </div>
              </div>
            </div>

            <div className="flex flex-col min-w-[240px] group">
              <label
                htmlFor="destination-select"
                className="mb-2 text-sm font-medium text-yellow-300"
              >
                Destination:
              </label>
              <div className="relative">
                <select
                  id="destination-select"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0d1a35] rounded-xl appearance-none cursor-pointer border border-white/15 text-white transition-all duration-300 hover:border-yellow-400 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/30"
                >
                  <option value="">Select Destination</option>
                  {locationNames.map((place) => (
                    <option key={place} value={place}>
                      {place}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                  ▼
                </div>
              </div>
            </div>

            <button
              onClick={() => updateRoute(false)}
              disabled={!source || !destination}
              className={`${buttonBaseClass} ${buttonRipple} transform hover:-translate-y-1 active:translate-y-0 ${
                !source || !destination
                  ? "bg-white/10 cursor-not-allowed text-white/40"
                  : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-emerald-500/30"
              }`}
            >
              Show Route
            </button>

            <button
              onClick={handleStartNavigation}
              disabled={!source || !destination || isNavigating}
              className={`${buttonBaseClass} ${buttonRipple} transform hover:-translate-y-1 active:translate-y-0 ${
                !source || !destination || isNavigating
                  ? "bg-white/10 cursor-not-allowed text-white/40"
                  : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg hover:shadow-indigo-500/30"
              }`}
            >
              Start Navigation
            </button>

            <button
              onClick={handleStopNavigation}
              disabled={!isNavigating}
              className={`${buttonBaseClass} ${buttonRipple} transform hover:-translate-y-1 active:translate-y-0 ${
                !isNavigating
                  ? "bg-white/10 cursor-not-allowed text-white/40"
                  : "bg-rose-500 hover:bg-rose-600 text-white shadow-lg hover:shadow-rose-500/30"
              }`}
            >
              Stop Navigation
            </button>
          </div>
        </div>
      </div>

      {voiceInstructions && (
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-4 p-4 bg-blue-500/15 border border-blue-400/30 rounded-xl text-blue-100">
            <p className="font-semibold">Voice Instructions:</p>
            <p className="text-sm mt-1 text-blue-100/90">{voiceInstructions}</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 transition-transform duration-300 hover:shadow-blue-900/30">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={defaultCenter}
            zoom={17}
            options={{ streetViewControl: false, mapTypeControl: false }}
          >
            {userLocation && (
              <Marker
                position={userLocation}
                icon={{
                  path: window.google?.maps?.SymbolPath?.CIRCLE || 0,
                  scale: 10,
                  fillColor: "#4285F4",
                  fillOpacity: 1,
                  strokeColor: "#FFFFFF",
                  strokeWeight: 2,
                }}
              />
            )}

            {Object.entries(locations).map(([name, data]) => (
              <Marker
                key={name}
                position={data.coords}
                title={name}
                icon={{
                  path: window.google?.maps?.SymbolPath?.CIRCLE || 0,
                  scale: 8,
                  fillColor: data.color,
                  fillOpacity: 1,
                  strokeWeight: 1,
                }}
              />
            ))}

            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}

const CollegeMap = () => {
  const [locations, setLocations] = useState({});
  const [mapKey, setMapKey] = useState(
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  );
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJsonWithFallback("/api/data/locations")
      .then((data) => setLocations(data || {}))
      .catch(() => setError("Unable to load locations from backend."));
  }, []);

  useEffect(() => {
    if (!mapKey) {
      fetchJsonWithFallback("/api/maps/key")
        .then((data) => {
          if (!data?.key) throw new Error("Maps key missing");
          setMapKey(data.key);
        })
        .catch(() => setError("Unable to load Google Maps key from backend."));
    }
  }, [mapKey]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen p-6 text-red-400 bg-[#060d1f] dot-pattern">
        {error}
      </div>
    );
  }

  if (!mapKey || Object.keys(locations).length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#060d1f] dot-pattern">
        <p className="text-lg text-white/70 font-medium">Loading map data...</p>
      </div>
    );
  }

  return <CollegeMapCanvas mapKey={mapKey} locations={locations} />;
};

export default CollegeMap;
