import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "../../shared/ui/card";
import MapComponent from "./MapComponent";

export default function BuildingMapContainer() {
  const [apiKey, setApiKey] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/maps/key")
      .then((res) => res.json())
      .then((data) => {
        if (data.key) setApiKey(data.key);
        else setError("Failed to get API key");
      })
      .catch((err) => {
        console.error("Error fetching map config:", err);
        setError("Error connecting to backend");
      });
  }, []);

  if (error) {
    return (
      <Card className="m-4">
        <CardContent>
          <div className="text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (!apiKey) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading Map Configuration...</span>
      </div>
    );
  }

  return <MapComponent apiKey={apiKey} />;
}
