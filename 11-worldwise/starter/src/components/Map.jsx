import styles from "./Map.module.css";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext.jsx";
import { useGeolocation } from "../hooks/useGeoLocation.js";
import Button from "./Button.jsx";
import { useUrlPos } from "../hooks/useUrlPos.js";

const icon = L.icon({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
});

const Map = () => {
  const {
    isLoading: isLoadingPos,
    position: geoLocPos,
    getPosition,
  } = useGeolocation();
  const [lat, lng] = useUrlPos();
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocPos) setMapPosition([geoLocPos.lat, geoLocPos.lng]);
  }, [geoLocPos]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocPos && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPos ? "Loading..." : "Use your position"}
        </Button>
      )}{" "}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />{" "}
        {cities?.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
            icon={icon}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}{" "}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

const ChangeCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
};

export default Map;
