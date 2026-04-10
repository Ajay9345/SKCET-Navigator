"use client";

import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  ChevronRight,
  ArrowLeft,
  Map,
  Globe,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import DepartmentInfo from "../../shared/components/DepartmentInfo";

const mapContainerStyle = { width: "100%", height: "100%" };
const MAP_LIBRARIES = ["geometry"];
const MAP_CENTER_DEFAULT = {
  lat: 10.939128171527996,
  lng: 76.95198003430953,
};

const Tab = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors duration-200 ${
      active
        ? "border-blue-500 text-blue-600"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`}
  >
    {children}
  </button>
);

const IndoorMapCanvas = ({
  departments,
  selectedKey,
  setSelectedKey,
  infoOpen,
  setInfoOpen,
  mapCenter,
  zoom,
  isDataLoading,
  activeTab,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: mapCenter.apiKey,
    libraries: MAP_LIBRARIES,
  });

  const selectedDept = selectedKey ? departments[selectedKey] : null;

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-300 ${activeTab === "map" ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      {loadError && (
        <div className="flex items-center justify-center h-full text-red-500">
          Unable to load Google Maps. Check API key and allow
          maps.googleapis.com/maps.gstatic.com if blocked by extensions.
        </div>
      )}
      {(isDataLoading || !isLoaded) && (
        <div className="flex items-center justify-center h-full">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter.coords}
          zoom={zoom}
          options={{
            mapTypeId: "satellite",
            tilt: 0,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
          }}
        >
          {Object.entries(departments).map(([key, dept]) => (
            <Marker
              key={key}
              position={dept.coords}
              title={dept.Name}
              onClick={() => {
                setSelectedKey(key);
                setInfoOpen(true);
              }}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: selectedKey === key ? "#3B82F6" : "#F59E0B",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              }}
            />
          ))}

          {selectedDept && infoOpen && (
            <InfoWindow
              position={selectedDept.coords}
              onCloseClick={() => setInfoOpen(false)}
            >
              <div className="p-2 min-w-[160px]">
                <h3 className="font-semibold text-gray-800 text-sm">
                  {selectedDept.Name}
                </h3>
                {selectedDept.HOD && (
                  <p className="text-xs text-gray-600 mt-1">
                    HOD: {selectedDept.HOD}
                  </p>
                )}
                {selectedDept.Courses && (
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedDept.Courses}
                  </p>
                )}
                {selectedDept.OfficialPage && (
                  <a
                    href={selectedDept.OfficialPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline mt-2 block"
                  >
                    Visit Website →
                  </a>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
};

const IndoorMap = () => {
  const [departments, setDepartments] = useState({});
  const [selectedKey, setSelectedKey] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState(MAP_CENTER_DEFAULT);
  const [zoom, setZoom] = useState(18);
  const [activeTab, setActiveTab] = useState("map");
  const [webViewUrl, setWebViewUrl] = useState("");
  const [mapKey, setMapKey] = useState(
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  );
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [dataError, setDataError] = useState("");
  const [keyError, setKeyError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationsRes = await fetch("/api/data/locations");
        if (!locationsRes.ok) {
          throw new Error(`Failed to fetch locations (${locationsRes.status})`);
        }
        const locationsData = await locationsRes.json();

        const normalizedDepartments = Object.fromEntries(
          Object.entries(locationsData || {}).map(([name, data]) => [
            name,
            {
              Name: name,
              coords: data.coords,
            },
          ]),
        );

        setDepartments(normalizedDepartments);
        setDataError("");
      } catch (error) {
        console.error("Error loading map data:", error);
        setDataError("Unable to load campus locations from backend.");
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!mapKey) {
      fetch("/api/maps/key")
        .then((res) => {
          if (!res.ok)
            throw new Error(`Failed to fetch maps key (${res.status})`);
          return res.json();
        })
        .then((data) => {
          const key = data?.key || "";
          if (!key) throw new Error("Maps key is empty");
          setMapKey(key);
          setKeyError("");
        })
        .catch((error) => {
          console.error("Error loading map key:", error);
          setKeyError("Unable to load Google Maps key from backend.");
        });
    }
  }, [mapKey]);

  const handleSelectLocation = (key) => {
    const dept = departments[key];
    if (!dept) return;
    setSelectedKey(key);
    setMapCenter(dept.coords);
    setZoom(20);
    setInfoOpen(true);
    if (dept.OfficialPage) setWebViewUrl(dept.OfficialPage);
  };

  const filteredEntries = Object.entries(departments).filter(([, dept]) =>
    dept.Name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const selectedDept = selectedKey ? departments[selectedKey] : null;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="p-4 md:hidden">
        <Link to="/home">
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
        </Link>
      </div>

      <aside className="w-full md:w-96 bg-white shadow-lg overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            SKCET Campus Navigator
          </h2>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {filteredEntries.map(([key, dept]) => (
            <button
              key={key}
              onClick={() => handleSelectLocation(key)}
              className="w-full text-left p-3 rounded-lg mb-2 flex items-center justify-between transition-all duration-200 hover:bg-gray-50 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <MapPin
                  size={20}
                  className={
                    selectedKey === key ? "text-blue-500" : "text-gray-400"
                  }
                />
                <span
                  className={
                    selectedKey === key
                      ? "text-blue-700 font-medium"
                      : "text-gray-700"
                  }
                >
                  {dept.Name}
                </span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          ))}
        </div>

        <AnimatePresence>
          {selectedDept && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 border-t border-gray-200 overflow-hidden"
            >
              <DepartmentInfo department={selectedDept} />
            </motion.div>
          )}
        </AnimatePresence>
      </aside>

      <main className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-4">
          <div className="flex space-x-4">
            <Tab
              active={activeTab === "map"}
              onClick={() => setActiveTab("map")}
            >
              <Map size={16} />
              <span>Map View</span>
            </Tab>
            <Tab
              active={activeTab === "web"}
              onClick={() => setActiveTab("web")}
            >
              <Globe size={16} />
              <span>Web View</span>
            </Tab>
          </div>
        </div>

        <div className="flex-1 relative">
          {(dataError || keyError) && activeTab === "map" && (
            <div className="absolute inset-0 flex items-center justify-center bg-white p-6">
              <div className="max-w-lg text-center text-red-600 space-y-2">
                <p>{dataError || keyError}</p>
                <p className="text-sm text-gray-700">
                  Ensure backend is running on port 5000 and maps requests are
                  not blocked by browser extensions.
                </p>
              </div>
            </div>
          )}

          {mapKey ? (
            <IndoorMapCanvas
              departments={departments}
              selectedKey={selectedKey}
              setSelectedKey={setSelectedKey}
              infoOpen={infoOpen}
              setInfoOpen={setInfoOpen}
              mapCenter={{ coords: mapCenter, apiKey: mapKey }}
              zoom={zoom}
              isDataLoading={isDataLoading}
              activeTab={activeTab}
            />
          ) : (
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${activeTab === "map" ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <div className="flex items-center justify-center h-full">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          )}

          <div
            className={`absolute inset-0 transition-opacity duration-300 ${activeTab === "web" ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            {webViewUrl ? (
              <iframe
                src={webViewUrl}
                title="Department Website"
                className="w-full h-full border-0"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-50">
                <p className="text-gray-500">
                  Select a department to view its website
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndoorMap;
