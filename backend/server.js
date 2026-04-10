require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const GOOGLE_MAPS_API_KEY =
  process.env.VITE_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY;
const LOG_PREFIX = "[Backend]";

app.use((req, res, next) => {
  const start = Date.now();
  console.log(`${LOG_PREFIX} Request start`, {
    method: req.method,
    path: req.path,
  });

  res.on("finish", () => {
    console.log(`${LOG_PREFIX} Request end`, {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      durationMs: Date.now() - start,
    });
  });

  next();
});

const loadJson = (filename) => {
  const filePath = path.join(__dirname, "data", filename);
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw);
    console.log(`${LOG_PREFIX} JSON loaded`, { filename });
    return parsed;
  } catch (error) {
    console.error(`${LOG_PREFIX} JSON load error`, {
      filename,
      message: error.message,
    });
    throw error;
  }
};

app.get("/api/data/locations", (req, res) => {
  const data = loadJson("locations.json");
  console.log(`${LOG_PREFIX} Sending locations`, {
    count: Object.keys(data || {}).length,
  });
  res.json(data);
});

app.get("/api/data/profiles", (req, res) => {
  const data = loadJson("building_profiles.json");
  console.log(`${LOG_PREFIX} Sending profiles`, {
    count: Object.keys(data || {}).length,
  });
  res.json(data);
});

app.get("/api/data/photos", (req, res) => {
  const data = loadJson("building_photos.json");
  console.log(`${LOG_PREFIX} Sending photos`, {
    count: Object.keys(data || {}).length,
  });
  res.json(data);
});

app.get("/api/data/faculty", (req, res) => {
  const data = loadJson("faculty_data.json");
  console.log(`${LOG_PREFIX} Sending faculty`, {
    count: Array.isArray(data) ? data.length : 0,
  });
  res.json(data);
});

app.get("/api/maps/key", (req, res) => {
  console.log(`${LOG_PREFIX} Maps key requested`, {
    hasKey: Boolean(GOOGLE_MAPS_API_KEY),
  });
  if (!GOOGLE_MAPS_API_KEY) {
    console.error(`${LOG_PREFIX} Maps key missing in environment`);
    return res
      .status(500)
      .json({ error: "Google Maps API key not configured on server." });
  }
  res.json({ key: GOOGLE_MAPS_API_KEY });
});

app.post("/api/maps/directions", async (req, res) => {
  const { origin, destination, mode } = req.body;
  console.log(`${LOG_PREFIX} Directions requested`, {
    hasOrigin: Boolean(origin),
    hasDestination: Boolean(destination),
    mode: mode || "walking",
  });

  if (!origin || !destination)
    return res.status(400).json({ error: "Origin and destination required." });

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/directions/json",
      {
        params: {
          origin: `${origin.lat},${origin.lng}`,
          destination: `${destination.lat},${destination.lng}`,
          mode: mode || "walking",
          key: GOOGLE_MAPS_API_KEY,
        },
      },
    );

    console.log(`${LOG_PREFIX} Directions API response`, {
      status: response.data?.status,
      routeCount: response.data?.routes?.length || 0,
      errorMessage: response.data?.error_message,
    });

    res.json(response.data);
  } catch (error) {
    console.error(`${LOG_PREFIX} Error fetching directions`, {
      message: error.message,
      responseStatus: error.response?.status,
      responseData: error.response?.data,
    });
    res.status(500).json({ error: "Failed to fetch directions." });
  }
});

app.listen(PORT, () => {
  console.log(
    `${LOG_PREFIX} Backend server running on http://localhost:${PORT}`,
  );
  console.log(
    `${LOG_PREFIX} Maps key available: ${Boolean(GOOGLE_MAPS_API_KEY)}`,
  );
});
