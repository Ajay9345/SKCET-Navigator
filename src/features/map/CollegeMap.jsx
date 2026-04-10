import React, { useState, useEffect, useRef } from "react"
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from "@react-google-maps/api"
import { LOCATIONS as locations } from "../../data/privateData"

const mapContainerStyle = { height: "80vh", width: "100%" }
const defaultCenter = { lat: 11.0168, lng: 77.0025 }
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const CollegeMap = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: ["places"],
  })

  const [userLocation, setUserLocation] = useState(null)
  const [source, setSource] = useState("")
  const [destination, setDestination] = useState("")
  const [directions, setDirections] = useState(null)
  const [isHovered, setIsHovered] = useState(null)
  const [isNavigating, setIsNavigating] = useState(false)
  const [voiceInstructions, setVoiceInstructions] = useState("")
  const intervalRef = useRef(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude }),
      (error) => console.error("Error fetching location:", error),
      { enableHighAccuracy: true }
    )
  }, [])

  const updateRoute = () => {
    if (!source || !destination) return
    const srcCoords = source === "Current Location" ? userLocation : locations[source]?.coords
    const destCoords = locations[destination]?.coords
    if (!srcCoords || !destCoords) return

    const directionsService = new window.google.maps.DirectionsService()
    directionsService.route(
      { origin: srcCoords, destination: destCoords, travelMode: window.google.maps.TravelMode.WALKING },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result)
          if (isNavigating) startNavigation(result)
        } else {
          console.error("Error fetching directions:", status)
        }
      }
    )
  }

  const startNavigation = (directionsResult) => {
    const steps = directionsResult.routes[0].legs[0].steps
    let currentStep = 0
    const speak = (text) => window.speechSynthesis.speak(new SpeechSynthesisUtterance(text))
    const updateStep = () => {
      if (currentStep < steps.length) {
        const instruction = steps[currentStep].instructions
        setVoiceInstructions(instruction)
        speak(instruction)
        currentStep++
      } else {
        clearInterval(intervalRef.current)
        setIsNavigating(false)
        speak("You have reached your destination.")
      }
    }
    intervalRef.current = setInterval(updateStep, 5000)
  }

  const handleStartNavigation = () => { setIsNavigating(true); updateRoute() }
  const handleStopNavigation = () => {
    setIsNavigating(false)
    clearInterval(intervalRef.current)
    setVoiceInstructions("")
    window.speechSynthesis.cancel()
  }

  if (!isLoaded) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg text-gray-600 font-medium">Loading Maps...</p>
    </div>
  )

  const buttonBaseClass = "relative overflow-hidden px-6 py-3 rounded-lg font-semibold transition-all duration-300"
  const buttonRipple = "after:content-[''] after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-white/20 after:scale-0 hover:after:scale-100 after:transition-transform after:duration-300 after:origin-center"

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 font-sans">
      <h1 className="text-4xl font-bold text-white text-center mb-8 animate-fade-in">College Navigation</h1>

      <div className="flex flex-wrap gap-4 mb-6 justify-center items-end">
        <button
          onClick={() => userLocation && setSource("Current Location")}
          disabled={!userLocation}
          onMouseEnter={() => setIsHovered('location')}
          onMouseLeave={() => setIsHovered(null)}
          className={`${buttonBaseClass} ${buttonRipple} transform hover:-translate-y-1 active:translate-y-0 ${!userLocation ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/50'}`}
        >
          Use My Current Location
        </button>

        <div className="flex flex-col min-w-[250px] group">
          <label htmlFor="source-select" className="mb-2 text-base font-medium text-blue-300">Source:</label>
          <div className="relative">
            <select id="source-select" value={source} onChange={(e) => setSource(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-lg appearance-none cursor-pointer border-2 border-transparent text-gray-800 transition-all duration-300 hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200">
              <option value="">Select Source</option>
              <option value="Current Location">Current Location</option>
              {Object.keys(locations).map((place) => <option key={place} value={place}>{place}</option>)}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
          </div>
        </div>

        <div className="flex flex-col min-w-[250px] group">
          <label htmlFor="destination-select" className="mb-2 text-base font-medium text-yellow-300">Destination:</label>
          <div className="relative">
            <select id="destination-select" value={destination} onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-lg appearance-none cursor-pointer border-2 border-transparent text-gray-800 transition-all duration-300 hover:border-yellow-400 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200">
              <option value="">Select Destination</option>
              {Object.keys(locations).map((place) => <option key={place} value={place}>{place}</option>)}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
          </div>
        </div>

        <button onClick={updateRoute} disabled={!source || !destination} onMouseEnter={() => setIsHovered('route')} onMouseLeave={() => setIsHovered(null)}
          className={`${buttonBaseClass} ${buttonRipple} transform hover:-translate-y-1 active:translate-y-0 ${!source || !destination ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-green-500/50'}`}>
          Show Route
        </button>

        <button onClick={handleStartNavigation} disabled={!source || !destination || isNavigating} onMouseEnter={() => setIsHovered('start')} onMouseLeave={() => setIsHovered(null)}
          className={`${buttonBaseClass} ${buttonRipple} transform hover:-translate-y-1 active:translate-y-0 ${!source || !destination || isNavigating ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-purple-500 hover:bg-purple-600 text-white shadow-lg hover:shadow-purple-500/50'}`}>
          Start Navigation
        </button>

        <button onClick={handleStopNavigation} disabled={!isNavigating} onMouseEnter={() => setIsHovered('stop')} onMouseLeave={() => setIsHovered(null)}
          className={`${buttonBaseClass} ${buttonRipple} transform hover:-translate-y-1 active:translate-y-0 ${!isNavigating ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-red-500/50'}`}>
          Stop Navigation
        </button>
      </div>

      {voiceInstructions && (
        <div className="mt-4 p-4 bg-blue-100 rounded-lg text-blue-800">
          <p className="font-semibold">Voice Instructions:</p>
          <p>{voiceInstructions}</p>
        </div>
      )}

      <div className="rounded-lg overflow-hidden shadow-xl transition-transform duration-300 hover:shadow-2xl">
        <GoogleMap mapContainerStyle={mapContainerStyle} center={defaultCenter} zoom={17} options={{ streetViewControl: false, mapTypeControl: false }}>
          {userLocation && (
            <Marker position={userLocation} icon={{ path: window.google?.maps?.SymbolPath?.CIRCLE || 0, scale: 10, fillColor: "#4285F4", fillOpacity: 1, strokeColor: "#FFFFFF", strokeWeight: 2 }} />
          )}
          {Object.entries(locations).map(([name, data]) => (
            <Marker key={name} position={data.coords} title={name} icon={{ path: window.google?.maps?.SymbolPath?.CIRCLE || 0, scale: 8, fillColor: data.color, fillOpacity: 1, strokeWeight: 1 }} />
          ))}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
    </div>
  )
}

export default CollegeMap
