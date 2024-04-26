import React, { useState } from "react";

function LocationComponent() {
  const [location, setLocation] = useState(null);

  function successCallback(position) {
    const { latitude, longitude } = position.coords;
    setLocation({ latitude, longitude });
  }

  function errorCallback(error) {
    console.error("Error getting location:", error);
  }

  function getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback
      );
    } else {
      console.error("Geolocation is not available");
    }
  }

  return (
    <div style={{marginTop:'0.7rem', display: 'flex', alignItems:'center'}}>
      <button onClick={getLocation} style={{margin:'1rem 0rem', padding:'0.5rem 1rem'}}>Get Location</button>
      {location && (
        <div style={{marginLeft:'1rem'}}>
          {location.latitude}, {location.longitude}
        </div>
      )}
    </div>
  );
}

export default LocationComponent;
