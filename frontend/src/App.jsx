import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GetStarted from "./pages/GetStarted";
import Home from "./pages/Home";
import CollegeMap from "./features/map/CollegeMap";
import IndoorMap from "./features/map/IndoorMap";
import BuildingMap from "./features/map/BuildingMap";
import FacultyFinder from "./features/faculty/FacultyFinder";
// import Chatbot from "./features/chat/Chatbot"

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/home" element={<Home />} />
        <Route path="/map" element={<CollegeMap />} />
        <Route path="/b" element={<BuildingMap />} />
        <Route path="/indoor" element={<IndoorMap />} />
        <Route path="/faculty" element={<FacultyFinder />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      {/* <Chatbot /> */}
    </BrowserRouter>
  );
}

export default App;
