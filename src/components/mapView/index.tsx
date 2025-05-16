import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import { renderToString } from "react-dom/server";

type Location = {
  lat: number;
  lng: number;
  title: string;
  status: "pendente" | "em andamento" | "concluído" | "cancelado";
};

type MapViewProps = {
  locations: Location[];
};

const statusColors = {
  pendente: "#FFA500",
  "em andamento": "#1E90FF",
  concluído: "#32CD32",
  cancelado: "#FF0000",
  default: "#A9A9A9",
};

const createCustomIcon = (status: keyof typeof statusColors) => {
  const color = statusColors[status] || statusColors.default;

  const iconHtml = renderToString(
    <div
      style={{
        color: color,
        fontSize: "24px",
        transform: "translate(-12px, -24px)",
      }}
    >
      <FaMapMarkerAlt />
    </div>
  );

  return L.divIcon({
    html: iconHtml,
    className: "",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });
};

const MapView = ({ locations }: MapViewProps) => {
  const center: L.LatLngExpression = [-9.5111, -36.0086];

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "12px",
        zIndex: 1,
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />

      {locations.map((location, index) => (
        <Marker
          key={`marker-${index}`}
          position={[location.lat, location.lng]}
          icon={createCustomIcon(location.status)}
        >
          <Popup>
            <div className="popup-content">
              <strong>{location.title}</strong>
              <div
                style={{
                  backgroundColor: statusColors[location.status],
                  color: "white",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  marginTop: "4px",
                  display: "flex",
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                {location.status}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
