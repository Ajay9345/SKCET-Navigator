import React, { useEffect, useState } from "react"
import { GoogleMap, Marker, useLoadScript, InfoWindow, DirectionsRenderer } from "@react-google-maps/api"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"
import { Card, CardHeader, CardTitle, CardContent } from "../../shared/ui/card"
import { Button } from "../../shared/ui/button"
import { Navigation, Loader2, Images, BookOpen } from "lucide-react"
import BuildingGallery from "./BuildingGallery"
import BuildingProfileModal from "./BuildingProfileModal"
import { LOCATIONS as locations, BUILDING_PHOTOS as buildingPhotos, BUILDING_PROFILES as buildingProfiles } from "../../data/privateData"

const mapContainerStyle = { width: "100%", height: "600px" }
const center = { lat: 11.0168, lng: 77.0025 }

const staticBuildings = [
  { name: "Main Gate" }, { name: "Admin Block" }, { name: "Bike Parking" }, { name: "Food Court" },
  { name: "Library" }, { name: "Boys Hostel" }, { name: "Girls Hostel" }, { name: "Sk hall" }, { name: "Sports Ground" },
  { name: "Department of CSE" }, { name: "Department of CSBS" }, { name: "Department of CSD" },
  { name: "Department of CSE(Cyber)" }, { name: "Department of MCA" }, { name: "Department of AIDS" },
  { name: "Department of M.Tech CSE" }, { name: "Department of ECE" }, { name: "Department of EEE" },
  { name: "Department of Mechanical" }, { name: "Department of Civil" }, { name: "Department of IT" },
  { name: "Department of MBA" }, { name: "Department of Mechatronics" },
  { name: "C1 Block" }, { name: "C2 Block" }, { name: "C3 Block" }, { name: "C4 Block" },
  { name: "C5 Block" }, { name: "C6 Block" }, { name: "C7 Block" },
  { name: "Atm(State Bank)" }, { name: "Convention centre" }, { name: "Sri Krishna Temple" },
  { name: "VolleyBall Ground" }, { name: "BasketBall Court" }, { name: "Cricket Nets" },
]

const getBuildingState = (name) => {
  const now = new Date()
  const day = now.getDay()
  const hour = now.getHours()
  const isWorkingHours = hour >= 8 && hour < 17
  if (day === 0) return "closed"
  if (!isWorkingHours) return "closed"
  return "open"
}

const MapComponent = () => {
  const [theme] = useState("light")
  const [selectedBuilding, setSelectedBuilding] = useState(null)
  const [buildings] = useState(staticBuildings)
  const [mapError, setMapError] = useState(null)
  const [directions, setDirections] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [galleryBuilding, setGalleryBuilding] = useState(null)
  const [profileBuilding, setProfileBuilding] = useState(null)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  })

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude }),
        (error) => console.error("Error getting location:", error)
      )
    }
  }, [])

  const handleBuildingSelection = async (building) => {
    setSelectedBuilding(building)
    if (userLocation && building.name && locations[building.name]) {
      const directionsService = new google.maps.DirectionsService()
      try {
        const result = await directionsService.route({
          origin: userLocation,
          destination: locations[building.name].coords,
          travelMode: google.maps.TravelMode.WALKING,
        })
        setDirections(result)
      } catch (error) {
        console.error("Error getting directions:", error)
      }
    }
  }

  if (loadError) return <Card className="m-4"><CardContent><div className="text-red-500">Error loading maps</div></CardContent></Card>
  if (!isLoaded) return <Card className="m-4"><CardContent><Loader2 className="h-8 w-8 animate-spin text-primary" /></CardContent></Card>

  return (
    <>
      <div className="min-h-screen bg-[#060d1f] dot-pattern p-5 flex flex-col items-center overflow-hidden font-sans">
        <div className="w-full max-w-7xl mb-6 flex items-center gap-4">
          <a href="/home" className="text-white/40 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </a>
          <div>
            <h1 className="text-white font-bold text-xl" style={{ fontFamily: 'Sora, sans-serif' }}>Building Details</h1>
            <p className="text-white/30 text-xs mt-0.5">SKCET Campus Buildings</p>
          </div>
        </div>

        <div className="flex w-full max-w-7xl gap-5 flex-wrap justify-center">
          <Card className="w-full max-w-xl shadow-lg bg-[#0d1a35] border border-white/8">
            <CardHeader>
              <CardTitle className="text-white" style={{ fontFamily: 'Sora, sans-serif' }}>Campus Buildings</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.ul className="space-y-3">
                {buildings.map((building, index) => (
                  <motion.li
                    key={building.name}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-white/8 bg-[#0d1a35] p-3 rounded-xl"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div>
                      <strong className="text-lg text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{building.name}</strong>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Button variant="outline" className="flex justify-between w-full p-2 text-sm items-center truncate border-primary/20">
                          <strong className="truncate text-primary/80">Status:</strong>
                          <span className={cn("truncate max-w-[60%] text-ellipsis overflow-hidden", getBuildingState(building.name) === "open" ? "text-green-500" : "text-red-500")}>
                            {getBuildingState(building.name)}
                          </span>
                        </Button>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button onClick={() => handleBuildingSelection(building)} className="flex-1 bg-primary hover:bg-primary/90">
                          <Navigation className="mr-2 h-4 w-4" />Show Route
                        </Button>
                        {buildingPhotos[building.name] && (
                          <Button variant="outline" className="flex-1 border-primary/30 text-primary hover:bg-primary/10" onClick={() => setGalleryBuilding(building)}>
                            <Images className="mr-2 h-4 w-4" />Photos ({buildingPhotos[building.name].length})
                          </Button>
                        )}
                        {buildingProfiles[building.name] && (
                          <Button variant="outline" className="flex-1 border-primary/30 text-primary hover:bg-primary/10" onClick={() => setProfileBuilding(building)}>
                            <BookOpen className="mr-2 h-4 w-4" />Profile
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </CardContent>
          </Card>

          <Card className="w-full max-w-2xl h-[600px] overflow-hidden shadow-lg">
            <CardContent className="p-0 h-full">
              <GoogleMap
                mapContainerStyle={{ height: "100%", width: "100%" }}
                zoom={15}
                center={userLocation || center}
                onLoad={() => setMapError(null)}
                onError={() => setMapError("Error loading map")}
                options={{ styles: theme === "dark" ? [{ elementType: "geometry", stylers: [{ color: "#242f3e" }] }, { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] }, { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] }] : [] }}
              >
                {userLocation && (
                  <Marker position={userLocation} icon={{ path: google.maps.SymbolPath.CIRCLE, fillColor: "#4285F4", fillOpacity: 1, strokeWeight: 0, scale: 8 }} />
                )}
                {buildings.map((building) => (
                  <Marker
                    key={building.name}
                    position={locations[building.name].coords}
                    icon={{ path: google.maps.SymbolPath.CIRCLE, fillColor: getBuildingState(building.name) === "open" ? "#34D399" : "#EF4444", fillOpacity: 1, strokeWeight: 0, scale: 10 }}
                    onClick={() => handleBuildingSelection(building)}
                  />
                ))}
                {selectedBuilding && locations[selectedBuilding.name] && (
                  <InfoWindow position={locations[selectedBuilding.name].coords} onCloseClick={() => setSelectedBuilding(null)}>
                    <div className="p-2">
                      <h3 className="text-lg font-semibold text-gray-800">{selectedBuilding.name}</h3>
                      <p className={cn("text-sm font-bold", getBuildingState(selectedBuilding.name) === "open" ? "text-green-500" : "text-red-500")}>
                        {getBuildingState(selectedBuilding.name)}
                      </p>
                    </div>
                  </InfoWindow>
                )}
                {directions && <DirectionsRenderer directions={directions} />}
              </GoogleMap>
            </CardContent>
          </Card>
        </div>
      </div>

      {galleryBuilding && buildingPhotos[galleryBuilding.name] && (
        <BuildingGallery buildingName={galleryBuilding.name} photos={buildingPhotos[galleryBuilding.name]} onClose={() => setGalleryBuilding(null)} />
      )}
      {profileBuilding && buildingProfiles[profileBuilding.name] && (
        <BuildingProfileModal buildingName={profileBuilding.name} profile={buildingProfiles[profileBuilding.name]} onClose={() => setProfileBuilding(null)} />
      )}
    </>
  )
}

export default MapComponent
